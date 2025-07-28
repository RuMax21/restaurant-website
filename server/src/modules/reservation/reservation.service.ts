import { PrismaClient } from '@prisma/client';
import { Status } from '@prisma/client';
import {
    ReservationCreateDto,
    ReservationDto,
    ReservationUpdateDto,
    TimeSlotDto,
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
        const reservations: ReservationDto[] =
            await this.prisma.reservation.findMany({
                skip: offset,
                take: limit,
                include: {
                    client: {
                        select: {
                            id: true,
                            fullName: true,
                            phone: true,
                        },
                    },
                },
            });

        return reservations.map(reservation => ({
            id: reservation.id,
            date: reservation.date,
            time: reservation.time,
            guestsCount: reservation.guestsCount,
            status: reservation.status,
            clientId: reservation.clientId,
            tableId: reservation.tableId,
            notes: reservation.notes,
            client: {
                id: reservation.client.id,
                fullName: reservation.client.fullName,
                phone: reservation.client.phone,
                email: reservation.client.email,
            },
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
                status: { not: 'CANCELLED' },
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
                client: {
                    select: {
                        id: true,
                        fullName: true,
                        phone: true,
                        email: true,
                    },
                },
            },
        });

        return {
            id: reservation.id,
            date: reservation.date,
            time: reservation.time,
            guestsCount: reservation.guestsCount,
            status: reservation.status,
            clientId: reservation.clientId,
            tableId: reservation.tableId,
            notes: reservation.notes,
            client: {
                id: reservation.client.id,
                fullName: reservation.client.fullName,
                phone: reservation.client.phone,
                email: reservation.client.email,
            },
        } as ReservationDto;
    }

    public async getReservationById(id: number): Promise<ReservationDto> {
        const reservation: ReservationDto | null = await throwIfNotFound(
            this.prisma.reservation.findUnique({
                where: { id },
                include: {
                    reservationDishes: true,
                    client: {
                        select: {
                            id: true,
                            fullName: true,
                            phone: true,
                            email: true,
                        },
                    },
                },
            }),
            `Reservation with ID ${id} not found`,
        );

        if (!reservation)
            throw ApiError.NotFound(`Reservation with ID ${id} not found`);

        return {
            id: reservation.id,
            date: reservation.date,
            time: reservation.time,
            guestsCount: reservation.guestsCount,
            status: reservation.status,
            clientId: reservation.clientId,
            tableId: reservation.tableId,
            notes: reservation.notes,
            client: {
                id: reservation.client.id,
                fullName: reservation.client.fullName,
                phone: reservation.client.phone,
                email: reservation.client.email,
            },
        };
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

        const updated: ReservationDto = await this.prisma.reservation.update({
            where: { id },
            data: {
                ...data,
                ...dishesUpdate,
            },
            include: {
                reservationDishes: true,
                client: {
                    select: {
                        id: true,
                        fullName: true,
                        phone: true,
                        email: true,
                    },
                },
            },
        });

        return {
            id: updated.id,
            date: updated.date,
            time: updated.time,
            guestsCount: updated.guestsCount,
            status: updated.status,
            clientId: updated.clientId,
            tableId: updated.tableId,
            notes: updated.notes,
            client: {
                id: updated.client.id,
                fullName: updated.client.fullName,
                phone: updated.client.phone,
                email: updated.client.email,
            },
        };
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

        const updated: ReservationDto = await this.prisma.reservation.update({
            where: { id },
            data: {
                status,
            },
            include: {
                reservationDishes: true,
                client: {
                    select: {
                        id: true,
                        fullName: true,
                        phone: true,
                        email: true,
                    },
                },
            },
        });

        return {
            id: updated.id,
            date: updated.date,
            time: updated.time,
            guestsCount: updated.guestsCount,
            status: updated.status,
            clientId: updated.clientId,
            tableId: updated.tableId,
            notes: updated.notes,
            client: {
                id: updated.client.id,
                fullName: updated.client.fullName,
                phone: updated.client.phone,
                email: updated.client.email,
            },
        };
    }

    public async getUpcomingReservations(
        limit: number = 20,
        offset: number = 0,
    ): Promise<ReservationDto[]> {
        const now = new Date();

        const reservations: ReservationDto[] =
            await this.prisma.reservation.findMany({
                where: {
                    date: { gt: now },
                    status: { not: 'CANCELLED' },
                },
                orderBy: { date: 'asc' },
                include: {
                    reservationDishes: true,
                    client: {
                        select: {
                            id: true,
                            fullName: true,
                            phone: true,
                            email: true,
                        },
                    },
                },
                skip: offset,
                take: limit,
            });

        return reservations.map(reservation => ({
            id: reservation.id,
            date: reservation.date,
            time: reservation.time,
            guestsCount: reservation.guestsCount,
            status: reservation.status,
            clientId: reservation.clientId,
            tableId: reservation.tableId,
            notes: reservation.notes,
            client: {
                id: reservation.client.id,
                fullName: reservation.client.fullName,
                phone: reservation.client.phone,
                email: reservation.client.email,
            },
        })) as ReservationDto[];
    }

    public async getReservationsByDate(date: string) {
        const targetDate = new Date(date);
        const startDate = new Date(targetDate.setHours(0, 0, 0, 0));
        const endDate = new Date(targetDate.setHours(23, 59, 59, 999));

        const reservations: ReservationDto[] =
            await this.prisma.reservation.findMany({
                where: {
                    date: {
                        gte: startDate,
                        lte: endDate,
                    },
                    status: { not: 'CANCELLED' },
                },
                include: {
                    client: {
                        select: {
                            id: true,
                            fullName: true,
                            phone: true,
                        },
                    },
                },
                orderBy: { time: 'asc' },
            });

        const timeSlots: TimeSlotDto[] = [];
        const startTime: number = 8;
        const endTime: number = 22;

        for (let hour: number = startTime; hour < endTime; hour++) {
            const startTimeString = `${hour.toString().padStart(2, '0')}::00`;
            const endTimeString = `${(hour + 1).toString().padStart(2, '0')}::00`;

            const hourReservations: ReservationDto[] = reservations.filter(
                reservation => {
                    const [reservationHour] = reservation.time
                        .split(':')
                        .map(Number);
                    return reservationHour === hour;
                },
            );

            timeSlots.push({
                startTime: startTimeString,
                endTime: endTimeString,
                reservations: hourReservations.map(reservation => ({
                    id: reservation.id,
                    date: reservation.date,
                    time: reservation.time,
                    guestsCount: reservation.guestsCount,
                    status: reservation.status,
                    clientId: reservation.clientId,
                    tableId: reservation.tableId,
                    notes: reservation.notes,
                    client: {
                        id: reservation.client.id,
                        fullName: reservation.client.fullName,
                        phone: reservation.client.phone,
                        email: reservation.client.email,
                    },
                })),
            });
        }

        return {
            date,
            timeSlots,
        };
    }
}
