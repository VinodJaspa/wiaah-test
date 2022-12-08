import { getMyAppointmentsFetcher } from "api";
import { useQuery } from "react-query";

export const useGetAppointmentsQuery = () => {
  return useQuery("MyAppointments", getMyAppointmentsFetcher);
};
