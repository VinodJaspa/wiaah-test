import { getMyProfileData } from "api";
import { useQuery } from "react-query";

export const useGetMyProfileData = () => {
  return useQuery("MyProfileData", getMyProfileData);
};
