import { ProfileInfo, ShopSocialProfileInfo } from "types";
import { SocialProfileInfo } from "ui/placeholder";

export const getSocialProfileData = async (
  profileId: string
): Promise<ShopSocialProfileInfo> => {
  if (profileId) {
    return SocialProfileInfo;
  } else {
    throw new Error("profileId was not provided");
  }
};
