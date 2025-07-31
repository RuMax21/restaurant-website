import { adminRegisterSchema, adminLoginSchema } from '../validation/schema.ts';
import { type ChangeEvent, useState } from 'react';
import { ZodError } from 'zod';

export function useAdminForm<T extends Record<string, string>>(
    initialValue: T,
    schema: typeof adminRegisterSchema | typeof adminLoginSchema,
) {
    const [form, setForm] = useState<T>(initialValue);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        if (!schema) return true;

        try {
            schema.parse(form);
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof ZodError) {
                const fieldError: Record<string, string> = {};
                error.issues.forEach(issue => {
                    if (typeof issue.path[0] === 'string') {
                        fieldError[issue.path[0]] = issue.message;
                    }
                });
                setErrors(fieldError);
            }
            return false;
        }
    };

    return { form, errors, handleChange, validate, setErrors };
}
