import { useContactInfo } from './model/hooks/useContactInfo';
import AddressBlock from './ui/AddressBlock';
import LocationMap from './ui/LocationMap/LocationMap';
import SocialLinks from './ui/SocialLinks';
import WorkingHoursBlock from './ui/WorkingHoursBlock/WorkingHoursBlock';

export default function ContactInfo() {
  const data = useContactInfo();

  if (!data) return null;

  return (
    <section>
      <div>
        <AddressBlock
          address={data.address}
          phone={data.phone}
          email={data.email}
        />
        <WorkingHoursBlock hours={data.workingHours.weekdays} />
        <SocialLinks links={[]} />
      </div>
      <LocationMap
        latitude={data.coordinates.latitude}
        longitude={data.coordinates.longitude}
        title={data.name}
      />
    </section>
  );
}
