import { useQuery } from "react-query";
import { getShareWithFriends } from "api";

export const useGetShareWithFriends = (searchKey: string) => {
  return useQuery(
    ["ShareWithFriends", { searchKey }],
    () => {
      return getShareWithFriends();
    },
    {
      enabled: typeof searchKey === "string",
    }
  );
};
