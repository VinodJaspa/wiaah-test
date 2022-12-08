import { getSocialProfileData } from "api";
import { useQuery } from "react-query";

export const useGetSocialProfile = (profileId: string) => {
  return useQuery(
    ["SocialProfileData", { profileId }],
    () => getSocialProfileData(profileId),
    {
      enabled: !!profileId,
    }
  );
};
