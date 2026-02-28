export interface AddressBlockProps {
  address: string;
  phone: string;
  email: string;
}

export interface WorkingHoursBlockProps {
  hours: string;
}

export interface SocialLink {
  id: string;
  href: string;
  label: string;
}

export interface SocialLinkProps {
  links: SocialLink[];
}

export interface ContactInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  workingHours: {
    weekdays: string;
    weekends: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  transport: {
    buses: string[];
  };
}
