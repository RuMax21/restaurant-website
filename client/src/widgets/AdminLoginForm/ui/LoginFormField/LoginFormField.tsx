import type { LoginFormProps } from '../model';

export default function LoginFormField({
  id,
  label,
  error,
  children,
}: LoginFormProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <span>{error}</span>}
    </div>
  );
}
