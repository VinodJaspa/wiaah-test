import React from "react";

interface BookingsSectionCtxValues {
  bookId: string | null;
  setBookId: (id: string | null) => void;
}

export const BookingsSectionCtx = React.createContext<BookingsSectionCtxValues>({
  bookId: null,
  setBookId: () => {},
});
