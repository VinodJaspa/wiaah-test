import { ShopSocialProfileInfo } from "types";
import { SocialProfileInfo } from "ui";

export const getMyProfileData = async (): Promise<ShopSocialProfileInfo> => {
  return SocialProfileInfo;
};
