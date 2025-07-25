
import { useState } from "react";
import ReservationAgenda from "./ReservationAgenda";

const dummyAppointments = [
  {
    time: "9:00 AM",
    client: "Sophia Clark",
    service: "Yoga Session",
    duration: "1 hour",
    status: "Cancelled",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    time: "10:30 AM",
    client: "Ethan Bennett",
    service: "Personal Training",
    duration: "30 Minutes",
    status: "Confirmed",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    time: "1:00 PM",
    client: "Emily Carter",
    service: "Nutrition Consultation",
    duration: "6 Month",
    status: "Cancelled",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
  },
  {
    time: "3:00 PM",
    client: "Liam Foster",
    service: "Pilates Class",
    duration: "2 days",
    status: "Confirmed",
    avatar: "https://randomuser.me/api/portraits/men/43.jpg",
  },
  {
    time: "5:00 PM",
    client: "Ava Morgan",
    service: "Massage Therapy",
    duration: "1 year",
    status: "Confirmed",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
];


export default function ReseravtionAgendaSectionMainPage() {
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);

  return (
    <ReservationAgenda
      selectedDate={date}
      onDateChange={setDate}
      appointments={dummyAppointments}
      currentPage={page}
      totalPages={5}
      onPageChange={setPage}
    />
  );
}

