import React from "react";
import { useRouter } from "next/router";
import { useGetNewsfeedPostStory, SpinnerFallback, PostCard } from "@UI";
import { useStory } from "@UI";

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
    <div className="cursor-pointer" onClick={handleRoute}>
      <div className="pointer-events-none">
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          {data && <PostCard {...data} />}
        </SpinnerFallback>
      </div>
    </div>
  );
};
