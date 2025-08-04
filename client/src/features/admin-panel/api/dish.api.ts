import { axiosInstance } from '../../../shared/lib/axiosInstance.ts';

export interface Dish {
    id: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    imageUrls: string[];
    ingredients?: any;
    category?: {
        id: number;
        name: string;
    };
}

export interface DishFormData {
    name: string;
    description: string;
    price: number;
    categoryId: number;
    imageUrls: string[];
    ingredients?: any;
}

export const dishApi = {
    getAll: () => axiosInstance.get<Dish[]>('/dish'),
    create: (data: DishFormData) => axiosInstance.post<Dish>('/dish', data),
    update: (id: number, data: DishFormData) =>
        axiosInstance.put<Dish>(`/dish/${id}`, data),
    delete: (id: number) => axiosInstance.delete(`/dish/${id}`),
};
