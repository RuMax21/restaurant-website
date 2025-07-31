export interface ContactsDataTypes {
    name: string;
    address: string;
    phone: string;
    email: string;
    workingHours: {
        weekdays: string;
        weekends: string;
    };
    coordinates: {
        latitude: number;
        longitude: number;
    };
    transport: {
        buses: string[];
    };
}

export const contactsData: ContactsDataTypes = {
    name: '404: Food Not Found',
    address: 'Kirova Street, 16, Voronezh',
    phone: '+7 (473) 123-45-67',
    email: 'info@restaurant.ru',
    workingHours: {
        weekdays: 'Mon-Fri: 9:00 - 22:00',
        weekends: 'Sat-Sun: 11:00 - 00:00',
    },
    coordinates: {
        latitude: 51.660979062986506,
        longitude: 39.19878327027441,
    },
    transport: {
        buses: ['8', '16', '32'],
    },
};
