import { useMutation, UseMutationOptions } from "react-query";
import { AddProductTrackingLinkFetcher, AddProductTrackingLinkDto } from "api";
export const useAddProductTrackingLink = (
  options?: Omit<
    UseMutationOptions<any, any, AddProductTrackingLinkDto, any>,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation<any, any, AddProductTrackingLinkDto>(
    AddProductTrackingLinkFetcher,
    options
  );
};
