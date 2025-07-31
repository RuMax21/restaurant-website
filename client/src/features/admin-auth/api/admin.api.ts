import { axiosInstance } from '../../../shared/lib/axiosInstance.ts';
import type { AdminLoginResponse } from '../dto/admin.dto.ts';

export const adminApi = {
    login: async (dto: {
        email: string;
        password: string;
    }): Promise<{ data: AdminLoginResponse }> =>
        axiosInstance.post('/admin/login', dto),

    register: async (dto: {
        fullName: string;
        email: string;
        password: string;
    }) => axiosInstance.post('/admin/register', dto),
};
