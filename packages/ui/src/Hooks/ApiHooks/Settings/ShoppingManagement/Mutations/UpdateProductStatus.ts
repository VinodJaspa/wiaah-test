import { useMutation, UseMutationOptions } from "react-query";
import { UpdateProductStatusFetcher } from "api";
import { UpdateProductStatusDto } from "dto";

export const useUpdateProductStatus = (
  options?: Omit<
    UseMutationOptions<any, any, UpdateProductStatusDto, any>,
    "mutationKey" | "mutationFn"
  >,
) => {
  return useMutation<any, any, UpdateProductStatusDto>(
    UpdateProductStatusFetcher,
    options,
  );
};
