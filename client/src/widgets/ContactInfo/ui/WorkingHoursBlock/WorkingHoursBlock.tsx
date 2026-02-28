import { ClockAlert } from 'lucide-react';
import type { WorkingHoursBlockProps } from '../../model';

export default function WorkingHoursBlock({ hours }: WorkingHoursBlockProps) {
  return (
    <div>
      <h2>Working Hours</h2>
      <p>
        <ClockAlert />
        {hours}
      </p>
    </div>
  );
}
