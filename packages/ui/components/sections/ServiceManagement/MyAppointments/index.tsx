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

// export const CalenderBookingsList: React.FC<{
//   length: number;
// }> = ({ children }) => {
//   const { t } = useTranslation();
//   const [open, setOpen] = React.useState<boolean>(false);

//   const showMore = !open && length > 1;

//   const showLess = !showMore && open;

//   const more = length - 1;

//   return (
//     <>
//       {React.Children.toArray(children)
//         .slice(0, open ? 1 : length)
//         .map((v, i) => runIfFn(v, { key: i }))}
//       {showMore ? (
//         <p onClick={() => setOpen(true)} className="text-primary font-semibold">
//           {t("show more")} {`(${more}+)`}
//         </p>
//       ) : null}
//       {showMore}-{showLess}-{length}-{more}
//       {showLess ? (
//         <p onClick={() => setOpen(true)} className="text-primary font-semibold">
//           {t("show less")}
//         </p>
//       ) : null}
//     </>
//   );
// };
