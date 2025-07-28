export type ReservationStatusDto =
    'pending' |
    'deposited' |
    'waiting_payment' |
    'finished' |
    'cancelled';

export interface ReservationSlotDto {
    id: number;
    clientName: string;
    phone: string;
    email?: string;
    guestCount: number;
    date: string;
    time: string;
    status: ReservationStatusDto;
    note?: string;
}

export interface TimeSlotDto {
    startTime: string;
    endTime: string;
    reservations: ReservationSlotDto[];
}

export interface ScheduleDayDto {
    data: string;
    timeSlots: TimeSlotDto[];
}

export interface ReservationUpdateDto {
    clientName?: string;
    phone?: string;
    email?: string;
    guestCount?: number;
    date?: string;
    time?: string;
    status?: ReservationStatusDto;
    note?: string;
}