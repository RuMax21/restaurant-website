import { useState } from 'react';
import { TabButton } from '../../../shared/ui/button/TabButton.tsx';
import { AdminLoginForm } from '../../../features/admin-auth/ui/AdminLoginForm.tsx';
import { AdminRegisterForm } from '../../../features/admin-auth/ui/AdminRegisterForm.tsx';

export function AdminAuthSwitcher() {
    const [mode, setMode] = useState<'Sign in' | 'Sign up'>('Sign in');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm mx-auto p-8 bg-white rounded shadow relative overflow-hidden">
                <div className="flex justify-center mb-6">
                    <TabButton
                        active={mode === 'Sign in'}
                        onClick={() => setMode('Sign in')}
                    >
                        Sign in
                    </TabButton>
                    <TabButton
                        active={mode === 'Sign up'}
                        onClick={() => setMode('Sign up')}
                    >
                        Sign up
                    </TabButton>
                </div>
                <div className="transition-all duration-500">
                    {mode === 'Sign in' ? (
                        <AdminLoginForm />
                    ) : (
                        <AdminRegisterForm />
                    )}
                </div>
            </div>
        </div>
    );
}
