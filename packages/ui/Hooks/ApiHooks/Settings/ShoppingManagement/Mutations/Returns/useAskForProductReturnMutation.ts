import { useMutation } from "react-query";
import { mutationOptions } from "../../../../utils";
import { AskForProductReturnFetcher } from "api";
import { AskForReturnDto } from "dto";
export const useAskForProductReturnMutation = (
  opts?: mutationOptions<any, any, AskForReturnDto>
) => {
  return useMutation(AskForProductReturnFetcher, opts);
};
