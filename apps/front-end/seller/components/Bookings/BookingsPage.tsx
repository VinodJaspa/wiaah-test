
import BookingTabs from "./BookingTabs";
import BookingList from "./BookingList";

import BookingDetailsPage from "./booking-details";
import React from "react";
import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";
import SearchBoxInner from "@UI/components/shadcn-components/SearchBox/SearchBoxInner";




export default function BookingsPage() {
  const [isBookingDetails, setBookingDetails] = React.useState(false);
  if(isBookingDetails){
    return (
      <BookingDetailsPage/>
  
    )
    
  }
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <SearchBoxInner />
      <BookingTabs />
      <BookingList setBookingDetails={setBookingDetails} />
      <Pagination />
    </div>
  );
}
