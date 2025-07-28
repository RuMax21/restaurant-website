import { Status } from '@prisma/client';

export interface ReservationDishDto {
    dishId: number;
    quantity: number;
    notes?: string;
}

export interface ReservationCreateDto {
    date: Date;
    time: string;
    guestsCount: number;
    clientId: number;
    tableId: number;
    notes?: string;
    dishes: ReservationDishDto[];
}

export interface ReservationUpdateDto {
    date?: Date;
    time?: string;
    guestsCount?: number;
    status?: Status;
    tableId?: number;
    notes?: string;
    dishes?: ReservationDishDto[];
}

export interface ReservationDto {
    id: number;
    date: Date;
    time: string;
    guestsCount: number;
    status: Status;
    clientId: number;
    tableId: number;
    notes: string | null;
    client: {
        id: number;
        fullName: string;
        phone: string;
        email?: string | null;
    };
}

export interface TimeSlotDto {
    startTime: string;
    endTime: string;
    reservations: ReservationDto[];
}

export interface ScheduleDayDto {
    date: string;
    timeSlots: TimeSlotDto[];
}
