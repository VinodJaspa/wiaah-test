import { useQuery } from "react-query";
import { newsfeedPosts } from "@UI";
import { getNewsFeedPostDetails } from "api";

export const useGetNewsFeedPostQuery = (id: string | null) => {
  return useQuery(["newsFeedPostDetails", { id }], getNewsFeedPostDetails, {
    enabled: !!id,
  });
};
