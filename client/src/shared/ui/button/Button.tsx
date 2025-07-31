import type { ButtonHTMLAttributes } from 'react';

export function Button({
    className,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={`
            py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50
            ${className} 
            `}
            {...props}
        />
    );
}
