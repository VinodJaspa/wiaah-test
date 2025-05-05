import { ListWrapper } from "../../../blocks/Wrappers";
import React from "react";

import { HashTagCard, HashTagCardProps } from "../HashTagCard";
import { useMediaQuery } from "react-responsive";

export interface HashTagPostsListWrapperProps {
  hashtags: (HashTagCardProps["post"] & {
    profile: HashTagCardProps["profile"];
    listTitle: string;
  })[];
  cols?: number;
}

export const HashTagPostsListWrapper: React.FC<
  HashTagPostsListWrapperProps
> = ({ hashtags, cols }) => {
  const Cols = useMediaQuery({ maxWidth: 767 })
    ? 1
    : useMediaQuery({ minWidth: 768, maxWidth: 1023 })
    ? 2
    : useMediaQuery({ minWidth: 1024 })
    ? 3
    : 1;  

  return (
    <ListWrapper data-testid="HashTagCardsContainer" cols={cols || Cols}>
      {hashtags &&
        hashtags.map((post, i) => (
          <HashTagCard
            data-testid="HashTagCard"
            key={i}
            title={post.listTitle}
            post={post}
            profile={post.profile}
          />
        ))}
    </ListWrapper>
  );
};
