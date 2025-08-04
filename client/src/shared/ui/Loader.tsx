import React from 'react';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'white';
}

export const Loader: React.FC<LoaderProps> = ({
    size = 'md',
    color = 'primary',
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    const colorClasses = {
        primary: 'text-blue-600',
        white: 'text-white',
    };

    return (
        <div
            className={`
            animate-spin rounded-full border-2 bg-gray-300 border-t-current
            ${sizeClasses[size]} ${colorClasses[color]}
            `}
        />
    );
};
