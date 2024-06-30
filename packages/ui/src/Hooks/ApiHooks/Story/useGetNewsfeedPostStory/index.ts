import { getUserStoryFetcher } from "api";
import { useQuery } from "react-query";
import { PostCardInfo, SocialStoryDataWithUser } from "types";

export const useGetNewsfeedPostStory = (postId: string, storyId: string) => {
  return useQuery<SocialStoryDataWithUser>(
    ["newsFeedPostStory", { postId, storyId }],
    () =>
      getUserStoryFetcher(postId, storyId) as Promise<SocialStoryDataWithUser>,
    {
      enabled: Boolean(postId),
      onError: (error) => {
        console.error("Error fetching newsfeed post story:", error);
      },
    },
  );
};
