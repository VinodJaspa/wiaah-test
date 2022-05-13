import { FlagIconCode } from "react-flag-kit";
import { ShopSocialProfileInfo } from "types";

export type UpdateProfileDto = Partial<{
  profileName: string;
  bio: string;
  location: string;
  countryCode: FlagIconCode;
  links: string[];
  profileImageSrc: string;
  profileCoverPhoto: string;
  newProfileImage: null | File;
}>;
