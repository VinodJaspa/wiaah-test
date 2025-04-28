import React from "react";
import {
  SocialPostHeader,
  SocialAffiliationCard,
  Button,
  SocialProfileAffiliationPostsList,
  useGetAffiliationPostQuery,
  GeneralPostView,
  newsFeedPostIdState,
} from "ui";
import { useTranslation } from "react-i18next";
import { AffiliationCardsListWrapper } from "@blocks/Social/AffiliationPostListWrapper";
import { newsfeedPosts } from "ui/placeholder";
import { useMediaQuery } from "react-responsive";


export interface AffiliationPostViewProps {
  id: string;
}

export const AffiliationPostView: React.FC<AffiliationPostViewProps> = ({
  id,
}) => {

  const { data: _post } = useGetAffiliationPostQuery({ id });
 
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });
  const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  
  const cols = isSmallScreen ? 1 : isMediumScreen ? 2 : isLargeScreen ? 3 : 1;
  

  return (
    <GeneralPostView postId={id} allPostsData={newsfeedPosts}>
      <AffiliationCardsListWrapper
        cols={cols}
        posts={newsfeedPosts}
        popup={false}
      />
    </GeneralPostView>
  );
};
