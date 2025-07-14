import { PrismaClient } from '@prisma/client';
import {ReservationCreateDto, ReservationDto } from "./reservation.dto";
import {ApiError} from "../../exception/api-errors.exception";
import {ClientDto} from "../client/client.dto";
import {TableDto} from "../table/table.dto";

export class ReservationService {
    private prisma = new PrismaClient();

    public async getAllReservations(): Promise<ReservationDto[]> {
        return (await this.prisma.reservation.findMany());
    }

    public async createReservation(data: ReservationCreateDto): Promise<ReservationDto> {
        const { dishes, ...reservationData } = data;

        const client = await this.prisma.clients.findUnique({
            where: { id: data.clientId },
        })
        if (!client) throw ApiError.NotFound(`Client with id ${data.clientId} not found`);

        const table = await this.prisma.tables.findUnique({
            where: { id: data.tableId },
        })
        if (!table) throw ApiError.NotFound(`Table with id ${data.clientId} not found`);

        if (!table.isAvailable) throw ApiError.Conflict(`Table with id ${data.tableId} is not available`);

        if (dishes && dishes.length > 0) {
            for (const dish of dishes) {
                const dishExists = await this.prisma.dishes.findUnique({
                    where: { id: dish.dishId },
                });

                if (!dishExists) throw ApiError.NotFound(`Dish with id ${dish.dishId} not found`);
            }
        }

        const conflictingReservation = await this.prisma.reservation.findMany({
            where: {
                tableId: data.tableId,
                date: data.date,
                status: { not: "REJECTED" }
            }
        });

        if (conflictingReservation.length > 0) throw ApiError.Conflict(`Table ${data.tableId} is already reserved for this time`);

        const reservation = await this.prisma.reservation.create({
            data: {
                ...reservationData,
                reservationDishes: {
                    create: dishes?.map(dish => ({
                        dishId: dish.dishId,
                        quantity: dish.quantity
                    })),
                }
            },
            include: {
                reservationDishes: true
            }
        });

        return reservation;
    }

}