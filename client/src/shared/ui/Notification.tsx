import type { ReactNode } from 'react';

interface NotificationProps {
    type?: 'success' | 'error' | 'info';
    children: ReactNode;
}

const typeStyles = {
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
};

export function Notification({ type = 'info', children }: NotificationProps) {
    return (
        <div
            className={`
            border px-4 py-2 rounded mb-2
            ${typeStyles[type]}
        `}
        >
            {children}
        </div>
    );
}
