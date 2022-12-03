import { getAccountSettingsFetcher } from "api";
import { useQuery } from "react-query";

export const useGetAccountSettingsQuery = () => {
  return useQuery("accountSettings", getAccountSettingsFetcher);
};
