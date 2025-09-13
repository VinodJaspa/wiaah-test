
import React from "react";
import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";
import SearchBoxInner from "@UI/components/shadcn-components/SearchBox/SearchBoxInner";
import SectionTabs from "@UI/components/shadcn-components/comman/Tabs/sectionTab";
import CardItems from "@UI/components/shadcn-components/comman/cards/cardItems";
import BookingCardList from "./ReservationCard";
export default function ResarvationSectionMainPage() {
  const [isBookingDetails, setBookingDetails] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  // if (isBookingDetails) {
  //   return (
  //     <BookingDetailsPage />

  //   )

  // }

  type Booking = {
    location: string;
    status: "Confirmed" | "Cancelled";
    dates: string;
    nights: string;
    amount: string;
    image: string;
  };

  const bookings: Booking[] = [
    {
      location: "New York",
      status: "Confirmed",
      dates: "Oct 12 – 15",
      nights: "3 nights",
      amount: "$1,200",
      image: "https://cdn.pixabay.com/photo/2016/11/17/09/28/hotel-1831072_1280.jpg", // NYC
    },
    {
      location: "Paris",
      status: "Cancelled",
      dates: "Nov 20 – 25",
      nights: "5 nights",
      amount: "$800",
      image: "https://tse3.mm.bing.net/th/id/OIP.yAI0T-3UGiPTbKtP6hQm1wHaEe?w=1024&h=619&rs=1&pid=ImgDetMain&o=7&rm=3", // Eiffel
    },
  ];
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <SearchBoxInner />
      <SectionTabs setActiveTab={setActiveIndex} activeTab={activeIndex} tabList={["All", "Upcoming", "Finshed"]} />

      <BookingCardList bookings={bookings} />

      <Pagination />
    </div>
  );
}
