import { FlagIconCode } from "react-flag-kit";

export interface UpdateProfileDto {
  profileName: string;
  bio: string;
  location: string;
  countryCode: FlagIconCode;
  links: string[];
  profileImageSrc: string;
  newProfileImage: null | File;
}
