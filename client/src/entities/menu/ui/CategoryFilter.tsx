import type { Category } from '../../../features/menu/api/menuApi.ts';
import React from 'react';
import { CategoryButton } from '../../../shared/ui/button/CategoryButton.tsx';

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: number | null;
    onCategorySelect: (categoryId: number | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    selectedCategory,
    onCategorySelect,
}) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Categories
            </h2>
            <div className="flex flex-wrap gap-3">
                <CategoryButton
                    isActive={selectedCategory === null}
                    onClick={() => onCategorySelect(null)}
                >
                    All dishes
                </CategoryButton>
            </div>
            {categories.map((category: Category) => (
                <CategoryButton
                    key={category.id}
                    isActive={selectedCategory === category.id}
                    onClick={() => onCategorySelect(category.id)}
                >
                    {category.name}
                </CategoryButton>
            ))}
        </div>
    );
};
