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
import { useBreakpointValue } from "utils";

export interface AffiliationPostViewProps {
  id: string;
}

export const AffiliationPostView: React.FC<AffiliationPostViewProps> = ({
  id,
}) => {
  const { t } = useTranslation();
  const { data: _post } = useGetAffiliationPostQuery({ id });

  const cols = useBreakpointValue({ base: 3 });

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
