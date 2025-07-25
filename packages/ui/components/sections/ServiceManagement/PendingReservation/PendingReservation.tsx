import { ArrowLeftAlt1Icon, HStack } from "@partials";
import SectionTitle from "@UI/components/shadcn-components/Title/SectionTitle";
import { useResponsive } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import ApproveReservationDialog from "./ResearvationDialog";

type Reservation = {
  avatar: string;
  name: string;
  date: string;
  time: string;
  service: string;
};

const data: Reservation[] = [
  {
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Julia Smith",
    date: "July 15, 2024",
    time: "10:00 AM",
    service: "Haircut",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "David Lee",
    date: "July 16, 2024",
    time: "2:00 PM",
    service: "Manicure",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Emily Carter",
    date: "July 17, 2024",
    time: "11:30 AM",
    service: "Facial",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "John Brown",
    date: "July 18, 2024",
    time: "9:00 AM",
    service: "Massage",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    name: "Sarah Wilson",
    date: "July 19, 2024",
    time: "3:30 PM",
    service: "Pedicure",
  },
];

export default function PendingReservationsSectionMain() {
  const { isMobile } = useResponsive()
  const [open, setOpen] = React.useState(true);
  const { t } = useTranslation();
  const { back } = useRouting();
  return (
    <div className="max-w-4xl mx-auto pb-6">
      <ApproveReservationDialog
        open={open}
        onApprove={() => {
          alert("Reservation Approved");
          setOpen(false);
        }}
        onRefuse={() => {
          alert("Reservation Refused");
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
      />
      {isMobile ?
        <div className="flex flex-col gap-4 p-4">
          <HStack className="justify-center relative">
            <p className="text-lg font-semibold">{t("Pending Reservations")}</p>
            <button onClick={() => back()}>
              <ArrowLeftAlt1Icon className="absolute top-1/2 -translate-y-1/2 left-4" />
            </button>
          </HStack>
        </div>
        :
        <SectionTitle className="text-2xl font-bold mb-6" title="Pending Reservations"></SectionTitle>
      }
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-sm border">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-50 font-medium text-gray-500">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-3 flex items-center gap-3">
                  <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full" />
                  {item.name}
                </td>
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3">{item.time}</td>
                <td className="px-4 py-3">{item.service}</td>
                <td className="px-4 py-3 text-right space-x-4">
                  {/* <button className="text-sm text-gray-600 hover:underline">View</button> */}
                  <button className="text-sm text-black hover:underline font-medium" onClick={()=> setOpen(true)}>Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        <div className="w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow-sm">
          {data.map((appt, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3 border-b last:border-b-0"
            >
              {/* Left: Avatar + Details */}
              <div className="flex items-start space-x-3">
                <img
                  src={appt.avatar}
                  alt={appt.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-sm text-gray-800">
                  <p className="font-semibold">{appt.name}</p>
                  <p className="text-gray-500 text-xs">
                    {appt.date} · {appt.time}
                  </p>
                  <p className="text-gray-400 text-xs">{appt.service}</p>
                </div>
              </div>

              {/* Right: Approve Button */}
              <button onClick={()=> setOpen(true)} className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-gray-700 font-medium">
                Approve
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
