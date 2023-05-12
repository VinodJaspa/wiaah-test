import React from "react";
import { BookDetailsSection, useGetMyProfileQuery, useUserData } from "@UI";
import { BookingsHistorySection } from "./BookingsHistory";

export const bookingsHistoryCtx = React.createContext<{
  appointmentId: string | null;
  shopping: boolean;
  viewAppointment: (id: string) => any;
  removeAppointment: () => any;
}>({
  shopping: false,
  appointmentId: null,
  viewAppointment: () => {},
  removeAppointment: () => {},
});

export const BookingsHistory: React.FC<{
  shopping?: boolean;
}> = ({ shopping }) => {
  const [appointmentId, setAppointmentId] = React.useState<string | null>(null);

  const { data } = useGetMyProfileQuery();

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
        shopping: shopping || false,
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
        data && <BookingsHistorySection accountId={data?.ownerId} />
      )}
    </bookingsHistoryCtx.Provider>
  );
};

export * from "./BookingsHistory";
