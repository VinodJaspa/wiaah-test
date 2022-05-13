import { ShopSocialProfileInfo, UpdateProfileDto } from "types";
import { SocialProfileInfo } from "ui";
export const updateMyProfile = async (
  input: UpdateProfileDto
): Promise<ShopSocialProfileInfo> => {
  return {
    ...SocialProfileInfo,
    ...input,
  };
};
