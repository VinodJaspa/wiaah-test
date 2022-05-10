import { getNewsfeedPostStory } from "api";
import { useQuery } from "react-query";
import { PostCardInfo } from "types";

export const useGetNewsfeedPostStory = (postId: string) => {
  return useQuery<PostCardInfo>(
    ["newsFeedPostStory", { postId }],
    () => {
      return getNewsfeedPostStory(postId);
    },
    {
      enabled: !!postId,
    }
  );
};
