import React from 'react';

interface FormFieldProps {
    label: string;
    required?: boolean;
    children?: React.ReactNode;
    className?: string;
}

export function FormField({
    label,
    required,
    children,
    className = '',
}: FormFieldProps) {
    return (
        <div className={className}>
            <label className="block text-sm font-medium mb-1">
                {label} {required && '*'}
            </label>
            {children}
        </div>
    );
}
