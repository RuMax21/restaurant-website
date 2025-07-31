import React from 'react';
import { ContactMapSection } from './ContactMapSection';
import { ContactInfoSection } from './ContactInfoSection';

export const ContactWidget: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-x-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Contacts
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                    <ContactMapSection />
                    <ContactInfoSection />
                </div>
            </div>
        </div>
    );
};
