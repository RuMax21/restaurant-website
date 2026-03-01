interface ButtonProps {
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function Button({
  className,
  onClick,
  disabled = false,
  children,
}: ButtonProps) {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
