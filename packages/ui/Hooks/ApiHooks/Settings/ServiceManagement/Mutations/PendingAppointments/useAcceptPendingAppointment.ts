import { useMutation } from "react-query";
import { AcceptPendingAppointment } from "api";
export const useAcceptPendingAppointmentMutation = () => {
  return useMutation(AcceptPendingAppointment);
};
