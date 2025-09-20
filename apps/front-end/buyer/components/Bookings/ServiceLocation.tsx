import { Contact } from "lucide-react";
import IconTextRow from "./IconTextRow"; // adjust path accordingly
import { MapPin } from 'lucide-react';
export default function ServiceLocation({ location }) {
  return (
    <section className="space-y-4">
      <h2 className="font-semibold text-lg">Service Location</h2>
      <div className="space-y-4">
        <IconTextRow
          icon={<MapPin className="w-6 h-6" />}
          title={location.name}
          subtitle={location.address}
        />
        <IconTextRow
          icon={<Contact className="w-6 h-6" />}
          title="Contact"
          subtitle={location.contact}
        />
      </div>
    </section>
  );
}
