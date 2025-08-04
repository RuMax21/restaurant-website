import React, { useCallback, useEffect } from 'react';
import { Loader } from '../../../shared/ui/Loader.tsx';
import { CategoryFilter } from '../../../entities/menu/ui/CategoryFilter.tsx';
import { DishCard } from '../../../entities/menu/ui/DishCard.tsx';
import { useMenuStore } from '../lib/useMenuStore.ts';

export const MenuWidget: React.FC = () => {
    const {
        dishes,
        categories,
        selectedCategory,
        isLoading,
        error,
        fetchDishes,
        fetchCategories,
        setSelectedCategory,
    } = useMenuStore();

    const handleCategorySelect = useCallback(
        (categoryId: number | null) => {
            setSelectedCategory(categoryId);
        },
        [setSelectedCategory],
    );

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        if (selectedCategory !== null) {
            fetchDishes(selectedCategory);
        } else {
            fetchDishes();
        }
    }, [selectedCategory, fetchDishes]);

    if (isLoading && dishes.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="text-center">
                    <Loader />
                    <p className="mt-4 text-gray-600">Loading the menu</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Restaurant Menu
                        </h1>
                        <p className="text-xl md:text-2xl opacity-90">
                            Discover our delicious dishes
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategorySelect={handleCategorySelect}
                />

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">
                                    Loading error
                                </h3>
                                <div className="mt-2 text-sm text-red-700">
                                    {error}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {isLoading && dishes.length > 0 && (
                    <div className="flex justify-center py-8">
                        <Loader />
                    </div>
                )}

                {!isLoading && dishes.length === 0 ? (
                    <div className="text-center py-16">
                        <h3 className="mt-4 text-lg font-medium text-gray-900">
                            Dishes not found
                        </h3>
                        <p className="mt-2 text-gray-500">
                            {selectedCategory
                                ? 'There are no dishes in the selected category yet'
                                : 'There are no dishes on the menu yet'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {dishes.map(dish => (
                            <DishCard key={dish.id} dish={dish} />
                        ))}
                    </div>
                )}

                <div className="mt-16 text-center text-gray-500">
                    <p className="text-sm">
                        All dishes are prepared with fresh ingredients according
                        to traditional recipes.
                    </p>
                </div>
            </div>
        </div>
    );
};
