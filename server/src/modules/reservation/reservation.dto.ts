import { Status } from "@prisma/client";

export interface ReservationDishDto {
    dishId: number;
    quantity: number;
    notes?: string;
}

export interface ReservationCreateDto {
    date: Date;
    guestsCount: number;
    clientId: number;
    tableId: number;
    notes?: string;
    dishes: ReservationDishDto[];
}

export interface ReservationUpdateDto {
    date?: Date;
    guestsCount?: number;
    status?: Status;
    tableId?: number;
    notes?: string;
    dishes?: ReservationDishDto[];
}

export interface ReservationDto {
    id: number;
    date: Date;
    guestsCount: number;
    status: Status;
    clientId: number;
    tableId: number;
    notes: string | null;
}
