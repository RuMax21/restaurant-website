import React from 'react';
import { contactsData } from '@/entities/contacts/model/ContactsInfo.ts';
import { ContactCard } from './ContactCard.tsx';
import { ContactIcon } from './ContactIcon.tsx';

export const ContactInfoSection: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                {contactsData.name}
            </h2>

            <div className="space-y-6">
                <ContactCard icon={<ContactIcon name='address'/>} title="Address">
                    <p className="text-gray-600">{contactsData.address}</p>
                </ContactCard>

                <ContactCard icon={<ContactIcon name='phone'/>} title="Phone">
                    <a
                        href={`tel:${contactsData.phone}`}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                        {contactsData.phone}
                    </a>
                </ContactCard>

                <ContactCard icon={<ContactIcon name='email'/>} title="Email">
                    <a
                        href={`mailto:${contactsData.email}`}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                        {contactsData.email}
                    </a>
                </ContactCard>

                <ContactCard icon={<ContactIcon name='time'/>} title="Working hours">
                    <div className="text-gray-600">
                        <p>{contactsData.workingHours.weekdays}</p>
                        <p>{contactsData.workingHours.weekends}</p>
                    </div>
                </ContactCard>
            </div>
        </div>
    );
};
