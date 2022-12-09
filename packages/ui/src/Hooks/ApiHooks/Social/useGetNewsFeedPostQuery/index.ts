import { useQuery } from "react-query";
import { newsfeedPosts } from "ui";
import { getNewsFeedPostDetails } from "api";

export const useGetNewsFeedPostQuery = (id: string | null) => {
  return useQuery(["newsFeedPostDetails", { id }], getNewsFeedPostDetails, {
    enabled: !!id,
  });
};
