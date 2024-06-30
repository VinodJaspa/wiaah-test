import { useMutation, UseMutationOptions } from "react-query";
import { AddProductTrackingLinkFetcher } from "api";
import { AddProductTrackingLinkDto } from "dto";
export const useAddProductTrackingLink = (
  options?: Omit<
    UseMutationOptions<any, any, AddProductTrackingLinkDto, any>,
    "mutationKey" | "mutationFn"
  >,
) => {
  return useMutation<any, any, AddProductTrackingLinkDto>(
    AddProductTrackingLinkFetcher,
    options,
  );
};
