import { z } from 'zod';

export const adminRegisterSchema = z.object({
    fullName: z.string().min(2),
    email: z.email(),
    password: z.string().min(8),
});

export const adminLoginSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
});
