import type { Dish } from '../../../features/menu/api/menuApi.ts';
import React from 'react';
import { IngredientsList } from './IngredientsList.tsx';

interface DishCardProps {
    dish: Dish;
}

export const DishCard: React.FC<DishCardProps> = ({ dish }) => {
    const mainImage = dish.imageUrls?.[0] || null;

    return (
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={mainImage}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="absolute top-3 right-3">
                <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    {dish.price.toFixed(2)} rub.
                </span>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                    {dish.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                    {dish.description}
                </p>
                <IngredientsList ingredients={dish.ingredients} />
            </div>
        </div>
    );
};
