import { useQuery } from "react-query";
import { getBlockedUsersFetcher } from "api";

export const useGetBlockedUsersQuery = () => {
  return useQuery("blockedUsers", getBlockedUsersFetcher);
};
