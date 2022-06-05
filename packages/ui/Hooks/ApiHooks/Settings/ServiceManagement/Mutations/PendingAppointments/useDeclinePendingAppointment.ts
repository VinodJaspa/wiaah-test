import { DeclinePendingAppointmentFetcher } from "api";
import { useMutation } from "react-query";

export const useDeclinePendingAppointmentMutation = () => {
  return useMutation(DeclinePendingAppointmentFetcher);
};
