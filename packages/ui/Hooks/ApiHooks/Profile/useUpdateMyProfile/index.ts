import { useMutation, UseMutationOptions } from "react-query";
import { updateMyProfile } from "api";
import { ShopSocialProfileInfo, UpdateProfileDto } from "types";
export const useUpdateMyProfile = (
  options?: Omit<
    UseMutationOptions<
      ShopSocialProfileInfo,
      unknown,
      UpdateProfileDto,
      unknown
    >,
    "mutationFn"
  >
) => {
  return useMutation<ShopSocialProfileInfo, unknown, UpdateProfileDto>(
    (input) => {
      return updateMyProfile(input);
    },
    options
  );
};
