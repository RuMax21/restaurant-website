import React, { useState } from 'react';
import { TablesManager } from '../../../features/admin-panel/ui/TablesManager.tsx';
import { CategoriesManager } from '../../../features/admin-panel/ui/CategoriesManager.tsx';
import { DishesManager } from '../../../features/admin-panel/ui/DishesManager.tsx';
import { TabButton } from '../../../shared/ui/button/TabButton.tsx';

type AdminTab = 'categories' | 'dishes' | 'tables' | 'reservation';

export const AdminPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AdminTab>('categories');

    const tabs = [
        { id: 'categories' as AdminTab, label: 'Categories' },
        { id: 'dishes' as AdminTab, label: 'Dishes' },
        { id: 'tables' as AdminTab, label: 'Tables' },
        { id: 'reservation' as AdminTab, label: 'Reservation' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'categories':
                return <CategoriesManager />;
            case 'dishes':
                return <DishesManager />;
            case 'tables':
                return <TablesManager />;
            // case 'reservation':
            default:
                return <CategoriesManager />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Admin Panel
                    </h1>
                    <p className="text-gray-600">Restaurant Management</p>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {tabs.map(tab => (
                                <TabButton
                                    key={tab.id}
                                    active={activeTab === tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </TabButton>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="p-6">{renderContent()}</div>
            </div>
        </div>
    );
};
