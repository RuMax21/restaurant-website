import React, { lazy, Suspense } from 'react';
import { Loader } from '../shared/ui/Loader.tsx';
import { Route, BrowserRouter, Routes } from 'react-router';
import { routes } from './routes.ts';
import { HomePage } from '../pages/home/HomePage.tsx';
import { Navigation } from '../shared/ui/Navigation.tsx';
import { MenuPage } from '../pages/menu';

const ContactPage: React.FC = lazy(() =>
    import('../pages/contact/ContactPage').then(module => ({
        default: module.ContactPage,
    })),
);
const AdminAuthPage: React.FC = lazy(() =>
    import('../pages/admin-auth/AdminAuthPage').then(module => ({
        default: module.default,
    })),
);
const AdminPanelPage: React.FC = lazy(() =>
    import('../pages/admin-panel/AdminPanelPage').then(module => ({
        default: module.AdminPanelPage,
    })),
);

const PageLoader: React.FC = () => (
    <div className="flex items-center justify-center min-h-screen">
        <Loader />
    </div>
);

export const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path={routes.home} element={<HomePage />} />
                    <Route path={routes.menu} element={<MenuPage />} />
                    <Route path={routes.contact} element={<ContactPage />} />
                    <Route
                        path={routes.admin.auth}
                        element={<AdminAuthPage />}
                    />
                    <Route
                        path={routes.admin.panel}
                        element={<AdminPanelPage />}
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};
