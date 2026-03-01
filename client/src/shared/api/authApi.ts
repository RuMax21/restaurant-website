import axios from 'axios';
import type { LoginFormValues, LoginResponse } from '../types/auth';

const authInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export const authApi = {
  login: async (values: LoginFormValues): Promise<LoginResponse> => {
    const { data } = await authInstance.post('/auth/login', values);
    return data;
  },
  refresh: async (): Promise<LoginResponse> => {
    const { data } = await authInstance.post('/auth/refresh');
    return data;
  },
  logout: async (): Promise<void> => {
    await authInstance.post('/auth/logout');
  },
};
