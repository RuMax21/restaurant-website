import {useAdminAuth} from "../model/useAdminAuth.ts";
import React from "react";
import {Input} from "../../../shared/ui/Input.tsx";
import {Button} from "../../../shared/ui/button/Button.tsx";
import {adminRegisterSchema} from "../validation/schema.ts";
import {AdminAuthFormLayout} from "./AdminAuthFormLayout.tsx";
import {useAdminForm} from "../lib/useAdminForm.ts";

export function AdminRegisterForm() {
    const { register, loading } = useAdminAuth();
    const { form, errors, handleChange, validate, setErrors } = useAdminForm(
        {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        adminRegisterSchema,
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match" });
            return;
        }

        if (!validate()) return;
        try {
            await register({
                fullName: form.fullName,
                email: form.email,
                password: form.password,
            });
            // add navigation
        } catch (error) {
            setErrors({
                server: error instanceof Error ?
                    error.message :
                    "Registration failed. Plese try again.",
            });
        }
    };

    return (
        <AdminAuthFormLayout title="Sign up">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Input
                        name="fullName"
                        placeholder="Full Name"
                        type="text"
                        value={form.fullName}
                        onChange={handleChange}
                    />
                    {errors.fullName && (
                        <div className="text-red-500 text-sm mt-1">{errors.fullName}</div>
                    )}
                </div>
                <div className="mb-4">
                    <Input
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <div className="text-red-500 text-sm mt-1">{errors.email}</div>
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
                        <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                    )}
                </div>
                <div className="mb-4">
                    <Input
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                        <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
                    )}
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                    { loading ? "We're registering..." : "Register" }
                </Button>
            </form>
        </AdminAuthFormLayout>
    );
}