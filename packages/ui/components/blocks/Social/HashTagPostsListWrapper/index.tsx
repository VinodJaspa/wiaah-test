import { useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { SocialHashTagTopPosts } from "ui/state";
import { HashTagCard, ListWrapper } from "ui";
import { HashTagCardInfo } from "types";

export interface HashTagPostsListWrapperProps {
  hashtags: HashTagCardInfo[];
  cols?: number;
}

export const HashTagPostsListWrapper: React.FC<HashTagPostsListWrapperProps> =
  ({ hashtags, cols }) => {
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
