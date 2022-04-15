import { useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { SocialHashTagTopPosts } from "ui/state";
import { HashTagCard } from "./HashTagCard";
import { ListWrapper } from "./ListWrapper";

export const HashTagPostsListWrapper: React.FC = () => {
  const cols = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });
  const topPosts = useRecoilValue(SocialHashTagTopPosts);

  return (
    <ListWrapper data-testid="HashTagCardsContainer" cols={cols || 1}>
      {topPosts.map((post, i) => (
        <HashTagCard data-testid="HashTagCard" key={i} {...post} />
      ))}
    </ListWrapper>
  );
};
