import React from 'react';
import { Link, useLocation } from 'react-router';

export const Navigation: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <Link
                            to="/"
                            className="text-xl font-bold text-gray-900"
                        >
                            Restaurant
                        </Link>

                        <Link
                            to="/menu"
                            className={`${isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            Menu
                        </Link>

                        <Link
                            to="/contact"
                            className={`${isActive('/contact') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            Contacts
                        </Link>

                        <Link
                            to="/admin/panel"
                            className={`${isActive('/admin/panel') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            Admin panel
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            to="/admin/auth"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
