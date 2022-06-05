import { BookingAppointement } from "types";

export const getMyAppointmentsFetcher = (): BookingAppointement[] => {
  const Bookings: BookingAppointement[] = [
    {
      bookId: "1234",
      from: new Date(Date.now()).toString(),
      to: new Date(Date.now()).toString(),
      customer: "cutstomer",
      email: "customer@test.com",
      phone: "132456832",
      date: new Date(Date.UTC(2022, 5, 30)).toString(),
      service: "back pain treatment",
      customerPhoto: "/shop.jpeg",
      verified: true,
    },
  ];

  return Bookings;
};
