import { Mail, MapPin, Phone } from 'lucide-react';
import type { AddressBlockProps } from '../../model';

export default function AddressBlock({
  address,
  phone,
  email,
}: AddressBlockProps) {
  return (
    <div>
      <h2>Address</h2>
      <ul>
        <li>
          <MapPin size={16} />
          {address}
        </li>
        <li>
          <Phone size={16} />
          {phone}
        </li>
        <li>
          <Mail size={16} />
          {email}
        </li>
      </ul>
    </div>
  );
}
