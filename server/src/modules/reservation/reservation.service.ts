import { PrismaClient } from '@prisma/client';
import { Status } from '@prisma/client';
import {
    ReservationCreateDto,
    ReservationDto,
    ReservationUpdateDto,
} from './reservation.dto';
import { ApiError } from '../../exception/api-errors.exception';
import { ClientDto } from '../client/client.dto';
import { TableDto } from '../table/table.dto';

export class ReservationService {
    private prisma = new PrismaClient();

    public async getAllReservations(): Promise<ReservationDto[]> {
        return await this.prisma.reservation.findMany();
    }

    public async createReservation(
        data: ReservationCreateDto,
    ): Promise<ReservationDto> {
        const { dishes, ...reservationData } = data;

        const client: ClientDto | null = await this.prisma.clients.findUnique({
            where: { id: data.clientId },
        });
        if (!client)
            throw ApiError.NotFound(
                `Client with id ${data.clientId} not found`,
            );

        const table: TableDto | null = await this.prisma.tables.findUnique({
            where: { id: data.tableId },
        });
        if (!table)
            throw ApiError.NotFound(`Table with id ${data.clientId} not found`);

        if (!table.isAvailable)
            throw ApiError.Conflict(
                `Table with id ${data.tableId} is not available`,
            );

        if (dishes && dishes.length > 0) {
            for (const dish of dishes) {
                const dishExists = await this.prisma.dishes.findUnique({
                    where: { id: dish.dishId },
                });

                if (!dishExists)
                    throw ApiError.NotFound(
                        `Dish with id ${dish.dishId} not found`,
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

        return reservation;
    }

    public async getReservationById(id: number): Promise<ReservationDto> {
        const reservation = await this.prisma.reservation.findUnique({
            where: { id: id },
            include: { reservationDishes: true },
        });
        if (!reservation)
            throw ApiError.NotFound(`Reservation with id ${id} not found`);

        return reservation;
    }

    public async updateReservation(
        id: number,
        data: ReservationUpdateDto,
    ): Promise<ReservationDto> {
        const reservation = await this.prisma.reservation.findUnique({
            where: { id },
        });
        if (!reservation)
            throw ApiError.NotFound(`Reservation with id ${id} not found`);

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

        const updated = await this.prisma.reservation.update({
            where: { id },
            data: {
                ...data,
                ...dishesUpdate,
            },
            include: {
                reservationDishes: true,
            },
        });
        return updated;
    }

    public async deleteReservation(id: number): Promise<void> {
        const reservation: ReservationDto | null =
            await this.prisma.reservation.findUnique({
                where: { id },
            });
        if (!reservation)
            throw ApiError.NotFound(`Reservation with id ${id} not found`);

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
        const reservation = await this.prisma.reservation.findUnique({
            where: { id },
        });
        if (!reservation)
            throw ApiError.NotFound(`Reservation with id ${id} not found`);

        const updated = await this.prisma.reservation.update({
            where: { id },
            data: {
                status,
            },
            include: {
                reservationDishes: true,
            },
        });

        return updated;
    }

    public async getUpcomingReservations(): Promise<ReservationDto[]> {
        const now = new Date();

        return await this.prisma.reservation.findMany({
            where: {
                date: { gt: now },
                status: { not: 'REJECTED' },
            },
            orderBy: { date: 'asc' },
            include: { reservationDishes: true },
        });
    }
}
