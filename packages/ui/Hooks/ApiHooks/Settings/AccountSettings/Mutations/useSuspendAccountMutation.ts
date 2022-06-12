import { suspendAccountFetcher } from "api";
import { useMutation } from "react-query";

export const useSuspendAccountMutation = () => {
  return useMutation(suspendAccountFetcher);
};
