import type React from 'react';
import type { IconProps } from './model';
import { AddressIcon, EmailIcon, PhoneIcon, TimeIcon } from './assets/icons';

const iconMap = {
  address: AddressIcon,
  email: EmailIcon,
  phone: PhoneIcon,
  time: TimeIcon,
} as const;

export const ContactIcon: React.FC<IconProps> = ({name, className = ''}) => {
  const IconComponent = iconMap[name];

  return (
    <IconComponent
      className={`text-red-500 w-6 h-6 ${className}`}
    />
  );
}