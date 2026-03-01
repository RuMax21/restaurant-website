import { useState } from 'react';
import type { LoginFormValues } from '@/shared/types/auth';
import { authApi } from '@/shared/api/authApi';
import { useAuthState } from '@/shared/store/authStore';

export const useAdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAccessToken = useAuthState(state => state.setAccessToken);

  const login = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const { accessToken } = await authApi.login(values);
      setAccessToken(accessToken);
      // TODO: add navigation to the admin-panel
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  }
  
  return { login, loading, error };
};
