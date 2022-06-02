import { useMutation, UseMutationOptions } from "react-query";
import { UpdateProductStatusDto, UpdateProductStatusFetcher } from "api";

export const useUpdateProductStatus = (
  options?: Omit<
    UseMutationOptions<any, any, UpdateProductStatusDto, any>,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation<any, any, UpdateProductStatusDto>(
    UpdateProductStatusFetcher,
    options
  );
};
