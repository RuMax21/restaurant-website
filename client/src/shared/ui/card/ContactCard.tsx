import React from 'react';

interface ContactCardProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}

export const ContactCard: React.FC<ContactCardProps> = ({
    icon,
    title,
    children,
}) => {
    return (
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">{icon}</div>
            <div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">
                    {title}
                </h3>
                {children}
            </div>
        </div>
    );
};
