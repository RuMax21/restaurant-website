import { useAdminAuth } from '../model/useAdminAuth.ts';
import { type FormEvent } from 'react';
import { Input } from '../../../shared/ui/Input.tsx';
import { Button } from '../../../shared/ui/button/Button.tsx';
import { adminLoginSchema } from '../validation/schema.ts';
import { AdminAuthFormLayout } from './AdminAuthFormLayout.tsx';
import { useAdminForm } from '../lib/useAdminForm.ts';

export function AdminLoginForm() {
    const { login, loading } = useAdminAuth();
    const { form, errors, handleChange, validate, setErrors } = useAdminForm(
        {
            email: '',
            password: '',
        },
        adminLoginSchema,
    );

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            await login(form);
            // add navigation
        } catch (error) {
            setErrors({
                server:
                    error instanceof Error
                        ? error.message
                        : 'Log in failed. Plese try again.',
            });
        }
    };

    return (
        <AdminAuthFormLayout title="Sign in">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Input
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.email}
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <Input
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.password}
                        </div>
                    )}
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Loading...' : 'Log in'}
                </Button>
            </form>
        </AdminAuthFormLayout>
    );
}
