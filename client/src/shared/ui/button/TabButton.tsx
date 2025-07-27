import React from "react";

interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
}

export function TabButton({ active, className, children, ...props  }: TabButtonProps) {
    return (
        <button
        className={`px-4 py-2 font-semibold transition border-b-2 
        ${active ? "text-blue-600 border-blue-600" : "text-gray-400 border-transparent"}
        ${className}`}
        {...props}
        >
            {children}
        </button>
    )
}