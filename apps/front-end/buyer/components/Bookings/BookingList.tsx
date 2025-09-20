import React from "react";
import BookingItem from "./BookingItem";
import BookingDetailsPage from "./booking-details";

const bookings = [
  {
    id: "12345",
    title: "Yoga Class",
    time: "10:00 AM – 11:00 AM",
    location: "Fitness First",
    image: "https://tse1.mm.bing.net/th/id/OIP.0--rUu4YCdT_MNrMQW8-mwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: "67890",
    title: "Pilates Class",
    time: "10:00 AM – 11:00 AM",
    location: "Pilates Pro",
    image: "https://tse1.mm.bing.net/th/id/OIP.ftQMFgwgTivJAWUXxPkaQgHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: "11223",
    title: "Zumba Class",
    time: "10:00 AM – 11:00 AM",
    location: "Dance Studio",
    image: "https://www.orissapost.com/wp-content/uploads/2019/02/Zumba-1.jpg",
  },
  {
    id: "44556",
    title: "Hotel Booking",
    time: "Check-in: 3:00 PM",
    location: "The Grand Resort",
    image: "https://th.bing.com/th/id/R.8935f81080cd727849f32c12ac759d89?rik=v9kJ3n2k2G4EKw&riu=http%3a%2f%2f3.bp.blogspot.com%2f-1byge6qgzN8%2fUoopoSL0oqI%2fAAAAAAAAe24%2fZaT8D8DHHJw%2fs1600%2fParis-Luxury-Hotel-Sofitel-passion4luxury-10.jpg&ehk=8ipXSOnaUcejTOY0Ifie8WT3amSg6aRkDhx5eEPHyH0%3d&risl=&pid=ImgRaw&r=0",
  },
];

export default function BookingList({setBookingDetails}) {

  return (
    <div className="mb-8">
      {bookings.map((booking) => (
        <BookingItem key={booking.id} booking={booking} handleBookingDeatils={()=> setBookingDetails(true)} />
      ))}
    </div>
  );
}
