import { ShopSocialProfileInfo, UpdateProfileDto } from "types";
import { SocialProfileInfo } from "ui";
export const updateMyProfile = async (
  input: UpdateProfileDto
): Promise<ShopSocialProfileInfo> => {
  return {
    ...SocialProfileInfo,
    links: input.links,
    bio: input.bio,
    name: input.profileName,
    thumbnail: input.profileImageSrc,
    location: input.location,
    countryCode: input.countryCode,
  };
};
