import { forwardRef, type InputHTMLAttributes } from 'react';

export const Input = forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
    <input
        ref={ref}
        className={`
            w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 ${className}
            `}
        {...props}
    />
));

Input.displayName = 'Input';
