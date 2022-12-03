import { cancelOrderFetcher } from "api";
import { useMutation } from "react-query";

export const useCancelOrderMutation = () => {
  return useMutation(cancelOrderFetcher);
};
