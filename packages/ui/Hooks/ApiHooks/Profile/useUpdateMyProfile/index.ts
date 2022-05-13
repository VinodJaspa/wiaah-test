import { useMutation } from "react-query";
import { updateMyProfile } from "api";
import { ShopSocialProfileInfo, UpdateProfileDto } from "types";
export const useUpdateMyProfile = () => {
  return useMutation<ShopSocialProfileInfo, unknown, UpdateProfileDto>(
    (input) => {
      return updateMyProfile(input);
    }
  );
};
