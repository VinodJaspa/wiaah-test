import React from "react";
import { HashTagCard, ListWrapper } from "ui";
import { HashTagCardInfo } from "types";
import { useBreakpointValue } from "utils";

export interface HashTagPostsListWrapperProps {
  hashtags: HashTagCardInfo[];
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
          <HashTagCard data-testid="HashTagCard" key={i} {...post} />
        ))}
    </ListWrapper>
  );
};
