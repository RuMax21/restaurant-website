import React from 'react';
import { Button } from '../button/Button.tsx';

interface FormModalProps {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    submitText?: string;
    cancelText?: string;
}

export const FormModal: React.FC<FormModalProps> = ({
    isOpen,
    title,
    children,
    onSubmit,
    onCancel,
    submitText = 'Save',
    cancelText = 'Cancel',
}) => {
    if (!isOpen) return null;

    return (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>

            <form onSubmit={onSubmit} className="space-y-4">
                {children}

                <div className="flex space-x-2">
                    <Button type="submit">{submitText}</Button>
                    <Button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 hover:bg-gray-600"
                    >
                        {cancelText}
                    </Button>
                </div>
            </form>
        </div>
    );
};
