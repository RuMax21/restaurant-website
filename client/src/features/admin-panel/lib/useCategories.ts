import {
    categoriesApi,
    type Category,
    type CategoryFormData,
} from '../api/categories.api.ts';
import { useEffect, useState } from 'react';

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await categoriesApi.getAll();
            setCategories(response.data);
            setError(null);
        } catch (error) {
            setError('There was an error fetching categories.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const createCategory = async (data: CategoryFormData) => {
        try {
            await categoriesApi.create(data);
            await fetchCategories();
            return true;
        } catch (error) {
            setError('There was an error creating categories.');
            console.error(error);
            return false;
        }
    };

    const updateCategory = async (id: number, data: CategoryFormData) => {
        try {
            await categoriesApi.update(id, data);
            await fetchCategories();
            return true;
        } catch (error) {
            setError('There was an error updating categories.');
            console.error(error);
            return false;
        }
    };

    const deleteCategory = async (id: number) => {
        try {
            await categoriesApi.delete(id);
            await fetchCategories();
        } catch (error) {
            setError('There was an error deleting categories.');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return {
        categories,
        loading,
        error,
        createCategory,
        updateCategory,
        deleteCategory,
        fetchCategories,
    };
};
