import React from "react";
import { HashTagCard, HashTagCardProps, ListWrapper } from "@UI";
import { HashTagCardInfo } from "types";
import { useBreakpointValue } from "utils";

export interface HashTagPostsListWrapperProps {
  hashtags: (HashTagCardProps["post"] & {
    profile: HashTagCardProps["profile"];
    listtTitle: string;
  })[];
  cols?: number;
}

export const HashTagPostsListWrapper: React.FC<
  HashTagPostsListWrapperProps
> = ({ hashtags, cols }) => {
  const Cols = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });

  return (
    <ListWrapper data-testid="HashTagCardsContainer" cols={cols || Cols}>
      {hashtags &&
        hashtags.map((post, i) => (
          <HashTagCard
            data-testid="HashTagCard"
            key={i}
            title={post.listtTitle}
            post={post}
            profile={post.profile}
          />
        ))}
    </ListWrapper>
  );
};
