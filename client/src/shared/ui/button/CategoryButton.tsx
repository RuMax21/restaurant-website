import React from 'react';

interface CategoryButtonProps {
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({
    isActive,
    onClick,
    children,
}) => {
    return (
        <button
            onClick={onClick}
            className={`
            px-4 py-2 rounded-full font-medium transition-colors duration-200
            ${
                isActive
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
            `}
        >
            {children}
        </button>
    );
};
