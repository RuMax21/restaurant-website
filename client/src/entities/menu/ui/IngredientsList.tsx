import React from 'react';

interface IngredientsListProps {
    ingredients: Object;
}

export const IngredientsList: React.FC<IngredientsListProps> = ({
    ingredients,
}) => {
    if (!ingredients) return null;

    const ingredientNames: string[] = Object.keys(ingredients);

    const formattingList = (list: string[]) => {
        if (list.length === 1) return list[0];

        return list.join(', ');
    };

    const ingredientsText = formattingList(ingredientNames);

    return (
        <div className="mb-3">
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Ingredients:
            </h4>
            <p className="text-xs text-gray-600 line-clamp-2">
                {ingredientsText}
            </p>
        </div>
    );
};
