import { getPendingAppointmentsFetcher } from "api";
import { useQuery } from "react-query";

export const useGetPendingAppointmentsQuery = () => {
  return useQuery(["PendingAppointments"], getPendingAppointmentsFetcher);
};
