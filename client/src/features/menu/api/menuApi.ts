import { axiosInstance } from '../../../shared/lib/axiosInstance.ts';

export interface Category {
    id: number;
    name: string;
    description: string;
}

export interface Dish {
    id: number;
    name: string;
    description: string;
    ingredients?: any;
    price: number;
    categoryId: number;
    imageUrls: string[];
    category: Category;
}

export const menuApi = {
    getDishes: async (categoryId?: number): Promise<Dish[]> => {
        const url: string = categoryId
            ? `/dish?categoryId=${categoryId}`
            : '/dish';
        console.log(url);
        const response = await axiosInstance.get<Dish[]>(url);
        return response.data;
    },

    getCategories: async (): Promise<Category[]> => {
        const response = await axiosInstance.get<Category[]>('/category');
        return response.data;
    },

    // getDishesByCategory: async (categoryId: number): Promise<Dish[]> => {
    //     const response = await axiosInstance.get<Dish[]>(`/dish?categoryId=${categoryId}`);
    //     return response.data;
    // }
};
