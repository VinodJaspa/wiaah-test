import React from "react";
import { BookDetailsSection } from "ui";
import { BookingsHistorySection } from "./BookingsHistory";

export const bookingsHistoryCtx = React.createContext<{
  appointmentId: string | null;
  viewAppointment: (id: string) => any;
  removeAppointment: () => any;
}>({
  appointmentId: null,
  viewAppointment: () => {},
  removeAppointment: () => {},
});

export const BookingsHistory: React.FC = () => {
  const [appointmentId, setAppointmentId] = React.useState<string | null>(null);

  function viewAppointment(id: string) {
    setAppointmentId(id);
  }

  function removeAppointment() {
    setAppointmentId(null);
  }
  return (
    <bookingsHistoryCtx.Provider
      value={{
        appointmentId,
        removeAppointment,
        viewAppointment,
      }}
    >
      {appointmentId ? (
        <BookDetailsSection
          onGoBack={removeAppointment}
          bookId={appointmentId}
        />
      ) : (
        <BookingsHistorySection />
      )}
    </bookingsHistoryCtx.Provider>
  );
};

export * from "./BookingsHistory";
