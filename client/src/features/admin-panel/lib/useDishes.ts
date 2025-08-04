import { type Dish, dishApi, type DishFormData } from '../api/dish.api.ts';
import { useEffect, useState } from 'react';
import { categoriesApi, type Category } from '../api/categories.api.ts';

export const useDishes = () => {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDishes = async () => {
        try {
            setLoading(true);
            const [dishesResponse, categoriesResponse] = await Promise.all([
                dishApi.getAll(),
                categoriesApi.getAll(),
            ]);
            setDishes(dishesResponse.data);
            setCategories(categoriesResponse.data);
            setError(null);
        } catch (error) {
            setError('There was an error fetching dishes or categories.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const createDish = async (data: DishFormData) => {
        try {
            await dishApi.create(data);
            await fetchDishes();
            return true;
        } catch (error) {
            setError('There was an error creating dish data.');
            console.error(error);
            return false;
        }
    };

    const updateDish = async (id: number, data: DishFormData) => {
        try {
            await dishApi.update(id, data);
            await fetchDishes();
            return true;
        } catch (error) {
            setError('There was an error updating dish data.');
            console.error(error);
            return false;
        }
    };

    const deleteDish = async (id: number) => {
        try {
            await dishApi.delete(id);
            await fetchDishes();
        } catch (error) {
            setError('There was an error deleting dish data.');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDishes();
    }, []);

    return {
        dishes,
        categories,
        loading,
        error,
        createDish,
        updateDish,
        deleteDish,
        fetchDishes,
    };
};
