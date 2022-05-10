import { Box } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { useGetNewsfeedPostStory, SpinnerFallback, PostCard } from "ui";
import { useStory } from "ui";

export interface NewsFeedPostStoryProps {
  postId: string;
}

export const NewsFeedPostStory: React.FC<NewsFeedPostStoryProps> = ({
  postId,
}) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetNewsfeedPostStory(postId);
  const { CloseStories } = useStory();
  function handleRoute() {
    CloseStories();
    if (data) {
      router.push(data.postInfo.url);
    }
  }

  return (
    <Box onClick={handleRoute} cursor={"pointer"}>
      <Box pointerEvents={"none"}>
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          {data && <PostCard {...data} />}
        </SpinnerFallback>
      </Box>
    </Box>
  );
};
