export interface UserProfileData {
  id: string;
  name: string;
  photo: string;
  activityType: string;
  verified?: boolean;
  profession: string;
}

export type UsersProfilesVariant = "narrow" | "long";
