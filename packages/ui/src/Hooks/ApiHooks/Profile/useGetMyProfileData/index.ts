import { getMyProfileData } from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { ShopSocialProfileInfo } from "types";

export const useGetMyProfileData = (
  opts?: Omit<
    UseQueryOptions<
      ShopSocialProfileInfo,
      unknown,
      ShopSocialProfileInfo,
      "MyProfileData"
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery("MyProfileData", getMyProfileData, opts);
};
