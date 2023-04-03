import React from "react";
import { BookDetailsSection } from "./BookDetails";
import { BookingsCalenderSection } from "./BookingsCalender";
interface BookingsSectionCtxValues {
  bookId: string | null;
  setBookId: (id: string | null) => any;
}

export const BookingsSectionCtx = React.createContext<BookingsSectionCtxValues>(
  {
    bookId: null,
    setBookId: () => {},
  }
);

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
