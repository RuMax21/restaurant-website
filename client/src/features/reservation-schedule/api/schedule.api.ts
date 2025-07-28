import { axiosInstance } from "../../../shared/lib/axiosInstance.ts";
import type {ReservationSlotDto, ReservationUpdateDto} from "../dto/schedule.dto.ts";

export const scheduleApi = {
    getReservation: async (id: number) =>
        await axiosInstance.get(`/reservations/${id}`),

    updateReservation: async (id: number, dto: ReservationUpdateDto) =>
        await axiosInstance.put(`/reservations/${id}`, dto),

    deleteReservation: async (id: number) =>
        await axiosInstance.delete(`/reservations/${id}`),

    createReservation: async (dto: Omit<ReservationSlotDto, 'id'>) =>
        await axiosInstance.post(`/reservation`, dto)
};