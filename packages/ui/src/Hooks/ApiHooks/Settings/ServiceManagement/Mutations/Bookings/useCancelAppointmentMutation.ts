import { useMutation } from "react-query";
import { CancelAppointmentFetcher } from "api";
export const useCancelAppointmentMutation = () => {
  return useMutation(CancelAppointmentFetcher);
};
