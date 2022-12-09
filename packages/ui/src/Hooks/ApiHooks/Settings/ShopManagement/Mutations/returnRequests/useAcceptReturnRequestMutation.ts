import { useMutation } from "react-query";
import { acceptReturnRequestFetcher } from "api";
import { mutationOptions } from "../../../../utils";
import { AcceptReturnRequestDto } from "dto";
export const useAcceptReturnRequestMutation = (
  opts?: mutationOptions<any, any, AcceptReturnRequestDto>
) => {
  return useMutation(acceptReturnRequestFetcher, opts);
};
