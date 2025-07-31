import type { ReactNode } from 'react';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
    return (
        open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded shadow-lg p-6 relative">
                    {title && (
                        <div className="text-lg font-bold mb-4">{title}</div>
                    )}
                    <button
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        onClick={onClose}
                    >
                        x
                    </button>
                    {children}
                </div>
            </div>
        )
    );
}
