import React, { value useImperativeHandle } from "react";
import { value Event } from "./ServiceBookingCalander";
import { value ServiceBookingCalander } from "ui";
import { value useOutsideClick } from "ui/Hooks/useOutsideClick";

export interface BookingEventProps {
  ref?: any;
  onSuccess?: (event: Event) => void;
}
export interface BookingEventRefProps {
  openServiceBooking: () => void;
  closeServiceBooking: () => void;
}

export const BookingEventPopup: React.FC<BookingEventProps> = React.forwardRef<
  BookingEventRefProps,
  BookingEventProps
>(({ onSuccess }, ref) => {
  const [show, setShow] = React.useState<boolean>(false);
  const BookCalenderRef = React.useRef<HTMLDivElement>(null);

  useOutsideClick(BookCalenderRef, () => {
    handleCloseBooking();
  });

  React.useImperativeHandle(ref, () => ({
    openServiceBooking() {
      handleOpenBooking();
    },

    closeServiceBooking() {
      handleCloseBooking();
    },
  }));

  function handleCloseBooking() {
    setShow(false);
  }

  function handleOpenBooking() {
    setShow(true);
  }

  function handleSuccess(event: Event) {
    if (!onSuccess) return;
    onSuccess(event);
  }

  return (
    <section
      className={`${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      } fixed  top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50 transition-all`}
    >
      <div
        ref={BookCalenderRef}
        className={`${
          show ? "translate-y-0" : "translate-y-1/2"
        } transition-all`}
      >
        <ServiceBookingCalander
          month={{
            name: "October",
            number: 11,
            daysNum: 31,
            firstDayName: "Fr",
            year: 2022,
            lastMonthDaysNum: 30,
            events: [
              {
                id: "1",
                name: "event 1 ",
                day: 5,
                availablity: true,
                from: "October 5, 2022 11:00:00",
                to: "October 5, 2022 11:40:00",
              },
              {
                id: "2",
                name: "event 2 ",
                day: 5,
                availablity: true,
                from: "October 5, 2022 12:20:00",
                to: "October 5, 2022 12:50:00",
              },
              {
                id: "3",
                name: "event 3 ",
                day: 9,
                availablity: true,
                from: "October 9, 2022 10:00:00",
                to: "October 9, 2022 10:40:00",
              },
            ],
          }}
          onClose={() => handleCloseBooking()}
          onSuccess={(event) => handleSuccess(event)}
        />
      </div>
    </section>
  );
});
