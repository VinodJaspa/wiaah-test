
import IconBox from "@UI/components/shadcn-components/IconBox/IconBox";
import ImageBox from "@UI/components/shadcn-components/ImageBox/ImageBox";
import {
  User,
  CalendarClock,
  Clock,
  LogOut,
  Users,
  CalendarDays,
  Users2,
} from "lucide-react";

export default function BookingOverview({ overview }) {
  return (
    <section className="space-y-4">
      <h2 className="font-semibold text-lg">Booking Overview</h2>
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
        <ImageBox src="https://tse1.explicit.bing.net/th/id/OIP.FHKjmPNLXC1ZL4NhlPtrUwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" alt="user" />
          <span>Client: {overview.clientName}</span>
        </div>
        <div className="flex items-center gap-2">
        <IconBox icon={<CalendarDays  className="w-6 h-6" />} />
          <span>Booking Date & Time: {overview.dateTime}</span>
        </div>
        <div className="flex items-center gap-2">
        <IconBox icon={<Clock className="w-6 h-6" />} />
          <span>Service Duration: {overview.duration}</span>
        </div>
        <div className="flex items-center gap-2">
        <IconBox icon={<LogOut className="w-6 h-6" />} />
          <span>Check-out: {overview.checkout}</span>
        </div>
        <div className="flex items-center gap-2">
        <IconBox icon={<Users2 className="w-6 h-6" />} />
          <span>Guests Allowed: {overview.guests}</span>
        </div>
      </div>
    </section>
  );
}
