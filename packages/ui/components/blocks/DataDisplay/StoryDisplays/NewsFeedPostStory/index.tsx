import React from "react";
import { useRouter } from "next/router";
import { useGetNewsfeedPostStory, SpinnerFallback, PostCard } from "@UI";
import { useStory } from "@UI";
import { AccountType } from "@features/API";
import { PostCardPlaceHolder } from "placeholder";
export interface NewsFeedPostStoryProps {
  postId: string;
}

export const NewsFeedPostStory: React.FC<NewsFeedPostStoryProps> = ({
  postId,
}) => {
  const router = useRouter();
  const { data: _data, isLoading, isError } = useGetNewsfeedPostStory(postId);
  const data = PostCardPlaceHolder;
  const { CloseStories } = useStory();
  function handleRoute() {
    CloseStories();
    if (data) {
      router.push(data.profileInfo.id);
    }
  }

  return (
    <div className="cursor-pointer" onClick={handleRoute}>
      <div className="pointer-events-none">
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          {data && <PostCard post={data} />}
        </SpinnerFallback>
      </div>
    </div>
  );
};
