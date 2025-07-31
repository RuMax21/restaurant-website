import React from 'react';
import { contactsData } from '../../../entities/contacts/model/ContactsInfo.ts';
import { OpenStreetMap } from '../../../shared/ui/map/OpenStreetMap.tsx';

export const ContactMapSection: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Our location
                </h2>
                <p className="text-gray-600">Find us on the map</p>
            </div>
            <div>
                <OpenStreetMap
                    latitude={contactsData.coordinates.latitude}
                    longitude={contactsData.coordinates.longitude}
                    title={contactsData.name}
                />
            </div>
        </div>
    );
};
