import { declineReturnRequestFetcher } from "api";
import { declineReturnRequestDto } from "dto";
import { useMutation } from "react-query";
import { mutationOptions } from "../../../../utils";

export const useDeclineReturnRequestMutation = (
  opts?: mutationOptions<any, any, declineReturnRequestDto>
) => {
  return useMutation(declineReturnRequestFetcher);
};
