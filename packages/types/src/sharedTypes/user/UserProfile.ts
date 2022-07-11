export interface UserProfileData {
  name: string;
  userPhotoSrc: string;
  activityType: string;
  verified?: boolean;
}

export type UsersProfilesVariant = "narrow" | "long";
