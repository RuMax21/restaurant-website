import { useForm } from 'react-hook-form';
import { useAdminLogin } from './model';
import type { LoginFormValues } from '@/shared/types/auth';
import {Button} from '@/shared/ui';
import LoginFormField from './ui/LoginFormField';

export default function AdminLoginForm() {
  const { login, loading, error } = useAdminLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  return (
    <div>
      <h1>Log In</h1>

      <LoginFormField id="email" label="Email" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email', {
            required: 'Input email',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email',
            },
          })}
        />
      </LoginFormField>

      <LoginFormField id="password" label="Password" error={errors.email?.message}>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register('password', {
            required: 'Input password',
            minLength: {
              value: 6,
              message: 'Minimum 6 characters',
            },
          })}
        />
      </LoginFormField>

      {error && <p>{error}</p>}

      <Button onClick={handleSubmit(login)} disabled={loading}>
        {loading ? 'Loading..' : 'Log In'}
      </Button>
    </div>
  );
}
