import { axiosInstance } from '../../../shared/lib/axiosInstance.ts';

export interface Category {
    id: number;
    name: string;
    description?: string;
}

export interface CategoryFormData {
    name: string;
    description: string;
}

export const categoriesApi = {
    getAll: () => axiosInstance.get<Category[]>('/category'),
    create: (data: CategoryFormData) =>
        axiosInstance.post<Category>('/category', data),
    update: (id: number, data: CategoryFormData) =>
        axiosInstance.put<Category>(`/category/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/category/${id}`),
};
