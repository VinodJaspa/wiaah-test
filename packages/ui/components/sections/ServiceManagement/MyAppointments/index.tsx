import React from "react";


import { BookingsSectionCtx } from "./BookingsSectionCtx";
import { BookingsCalenderSection } from "./BookingsCalender";


export const BookingsSection: React.FC = () => {
  const [bookId, setBookId] = React.useState<string | null>(null);

  return (
    <BookingsSectionCtx.Provider value={{ bookId, setBookId }}>
      <BookingsCalenderSection />
    </BookingsSectionCtx.Provider>
  );
};

export * from "./BookDetails";
export * from "./BookingsCalender";
