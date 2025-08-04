import { type Category, type Dish, menuApi } from '../api/menuApi.ts';
import { create } from 'zustand/react';

interface MenuStore {
    dishes: Dish[];
    categories: Category[];
    selectedCategory: number | null;
    isLoading: boolean;
    error: string | null;

    fetchDishes: (categoryId: number) => Promise<void>;
    fetchCategories: () => Promise<void>;
    // fetchDishesByCategory: (categoryId: number) => Promise<void>;
    setSelectedCategory: (categoryId: number | null) => void;
    clearError: () => void;
}

export const useMenuStore = create<MenuStore>(set => ({
    dishes: [],
    categories: [],
    selectedCategory: null,
    isLoading: false,
    error: null,

    fetchDishes: async (categoryId?: number) => {
        set({ isLoading: true, error: null });
        try {
            const dishes = await menuApi.getDishes(categoryId);
            set({
                dishes,
                selectedCategory: categoryId || null,
                isLoading: false,
            });
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : 'Error while fetching dishes',
                isLoading: false,
            });
        }
    },
    fetchCategories: async () => {
        set({ isLoading: true, error: null });
        try {
            const categories = await menuApi.getCategories();
            set({ categories, isLoading: false });
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : 'Error while fetching dishes',
                isLoading: false,
            });
        }
    },
    // fetchDishesByCategory: async (categoryId: number) => {
    //     set({ isLoading: true, error: null });
    //     try {
    //         const dishes = await menuApi.getDishesByCategory(categoryId);
    //         set({ dishes, selectedCategory: categoryId, isLoading: false });
    //     } catch (error) {
    //         set({
    //             error: error instanceof Error ? error.message : "Error while fetching dishes",
    //             isLoading: false,
    //         });
    //     }
    // },
    setSelectedCategory: async (categoryId: number | null) => {
        set({ selectedCategory: categoryId });
    },
    clearError: async () => {
        set({ error: null });
    },
}));
