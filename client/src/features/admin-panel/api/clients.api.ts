import { axiosInstance } from '../../../shared/lib/axiosInstance';

export interface Client {
    id: number;
    fullName: string;
    phone: string;
    email?: string;
}

export interface ClientFormData {
    fullName: string;
    phone: string;
    email?: string;
}

export const clientsApi = {
    getAll: () => axiosInstance.get<Client[]>('/client'),
    getById: (id: number) => axiosInstance.get<Client>(`/client/${id}`),
    create: (data: ClientFormData) =>
        axiosInstance.post<Client>('/client', data),
    update: (id: number, data: ClientFormData) =>
        axiosInstance.put<Client>(`/client/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/client/${id}`),
};
