import { PrismaClient } from '@prisma/client';
import { Status } from '@prisma/client';
import {
    ReservationCreateDto,
    ReservationDto,
    ReservationUpdateDto,
} from './reservation.dto';
import { ApiError } from '../../exception/api-errors.exception';
import { TableDto } from '../table/table.dto';
import { throwIfNotFound } from '../../utils/db.utils';

export class ReservationService {
    private prisma = new PrismaClient();

    public async getAllReservations(
        limit: number = 20,
        offset: number = 0,
    ): Promise<ReservationDto[]> {
        return (await this.prisma.reservation.findMany({
            skip: offset,
            take: limit,
        })) as ReservationDto[];
    }

    public async createReservation(
        data: ReservationCreateDto,
    ): Promise<ReservationDto> {
        const { dishes, ...reservationData } = data;

        await throwIfNotFound(
            this.prisma.clients.findUnique({ where: { id: data.clientId } }),
            `Client with ID ${data.clientId} not found`,
        );

        const table = (await throwIfNotFound(
            this.prisma.tables.findUnique({ where: { id: data.tableId } }),
            `Table with ID ${data.tableId} not found`,
        )) as TableDto;

        if (!table.isAvailable)
            throw ApiError.Conflict(
                `Table with ID ${data.tableId} is not available`,
            );

        if (dishes && dishes.length > 0) {
            for (const dish of dishes) {
                await throwIfNotFound(
                    this.prisma.dishes.findUnique({
                        where: { id: dish.dishId },
                    }),
                    `Dish with ID ${dish.dishId} not found`,
                );
            }
        }

        const conflictingReservation = await this.prisma.reservation.findMany({
            where: {
                tableId: data.tableId,
                date: data.date,
                status: { not: 'REJECTED' },
            },
        });

        if (conflictingReservation.length > 0)
            throw ApiError.Conflict(
                `Table ${data.tableId} is already reserved for this time`,
            );

        const reservation = await this.prisma.reservation.create({
            data: {
                ...reservationData,
                reservationDishes: {
                    create: dishes?.map(dish => ({
                        dishId: dish.dishId,
                        quantity: dish.quantity,
                    })),
                },
            },
            include: {
                reservationDishes: true,
            },
        });

        return reservation as ReservationDto;
    }

    public async getReservationById(id: number): Promise<ReservationDto> {
        return (await throwIfNotFound(
            this.prisma.reservation.findUnique({
                where: { id },
                include: { reservationDishes: true },
            }),
            `Reservation with ID ${id} not found`,
        )) as ReservationDto;
    }

    public async updateReservation(
        id: number,
        data: ReservationUpdateDto,
    ): Promise<ReservationDto> {
        await throwIfNotFound(
            this.prisma.reservation.findUnique({ where: { id } }),
            `Reservation with ID ${id} not found`,
        );

        let dishesUpdate = {};
        if (data.dishes) {
            await this.prisma.reservationDish.deleteMany({
                where: { reservationId: id },
            });
            dishesUpdate = {
                reservationDishes: {
                    create: data.dishes.map(dish => ({
                        dishId: dish.dishId,
                        quantity: dish.quantity,
                    })),
                },
            };
        }

        const updated = (await this.prisma.reservation.update({
            where: { id },
            data: {
                ...data,
                ...dishesUpdate,
            },
            include: {
                reservationDishes: true,
            },
        })) as ReservationDto;
        return updated;
    }

    public async deleteReservation(id: number): Promise<void> {
        await throwIfNotFound(
            this.prisma.reservation.findUnique({ where: { id } }),
            `Reservation with ID ${id} not found`,
        );

        await this.prisma.reservationDish.deleteMany({
            where: { reservationId: id },
        });
        await this.prisma.reservation.delete({
            where: { id },
        });
    }

    public async updateStatusReservation(
        id: number,
        status: Status,
    ): Promise<ReservationDto> {
        await throwIfNotFound(
            this.prisma.reservation.findUnique({ where: { id } }),
            `Reservation with ID ${id} not found`,
        );

        const updated = (await this.prisma.reservation.update({
            where: { id },
            data: {
                status,
            },
            include: {
                reservationDishes: true,
            },
        })) as ReservationDto;

        return updated;
    }

    public async getUpcomingReservations(
        limit: number = 20,
        offset: number = 0,
    ): Promise<ReservationDto[]> {
        const now = new Date();

        return (await this.prisma.reservation.findMany({
            where: {
                date: { gt: now },
                status: { not: 'REJECTED' },
            },
            orderBy: { date: 'asc' },
            include: { reservationDishes: true },
            skip: offset,
            take: limit,
        })) as ReservationDto[];
    }
}
