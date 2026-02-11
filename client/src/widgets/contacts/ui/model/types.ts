export interface IconProps {
  name: 'address' | 'phone' | 'email' | 'time';
  className?: string;
}

export interface ContactCardProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}