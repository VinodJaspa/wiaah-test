import { getAppointmentDetailsFetcher } from "api";
import { useQuery } from "react-query";

export const useGetAppointmentQuery = (appointmentId: string) => {
  return useQuery(["appointmentDetails", { appointmentId }], () =>
    getAppointmentDetailsFetcher(appointmentId)
  );
};
