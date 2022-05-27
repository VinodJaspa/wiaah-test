import React from "react";
import { Event } from "ui";
import { ServiceBookingCalander, Modal, ModalContent, ModalOverlay } from "ui";
import { useOutsideClick } from "ui";

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
  const [open, setOpen] = React.useState<boolean>(false);

  React.useImperativeHandle(ref, () => ({
    openServiceBooking() {
      handleOpenBooking();
    },

    closeServiceBooking() {
      handleCloseBooking();
    },
  }));

  function handleCloseBooking() {
    setOpen(false);
  }

  function handleOpenBooking() {
    setOpen(true);
  }

  function handleSuccess(event: Event) {
    if (!onSuccess) return;
    onSuccess(event);
  }

  return (
    <Modal
      isOpen={open}
      onClose={handleCloseBooking}
      onOpen={handleOpenBooking}
    >
      <ModalOverlay />
      <ModalContent>
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
          onSuccess={(event: Event) => handleSuccess(event)}
        />
      </ModalContent>
    </Modal>
  );
});
