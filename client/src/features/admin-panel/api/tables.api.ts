import { axiosInstance } from '../../../shared/lib/axiosInstance.ts';

export interface Table {
    id: number;
    number: string;
    capacity: number;
    location?: string;
    isAvailable: boolean;
}

export interface TableFormData {
    number: string;
    capacity: number;
    location: string;
    isAvailable: boolean;
}

export const tablesApi = {
    getAll: () => axiosInstance.get<Table[]>('/table'),
    create: (data: TableFormData) => axiosInstance.post<Table>('/table', data),
    update: (id: number, data: TableFormData) =>
        axiosInstance.put<Table>(`/table/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/table/${id}`),
};
