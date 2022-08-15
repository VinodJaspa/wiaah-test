import React from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import {
  PostCard,
  PostCardsListWrapper,
  SocialStoriesModal,
  SocialPostHeader,
  Button,
} from "ui";
import { useRecoilValue } from "recoil";
import {
  SocialNewsfeedOtherPostsState,
  SocialNewsfeedPostState,
} from "ui/state/Recoil/Social";
import { useTranslation } from "react-i18next";

export const PostView: React.FC = () => {
  const postCardInfo = useRecoilValue(SocialNewsfeedPostState);
  const otherPosts = useRecoilValue(SocialNewsfeedOtherPostsState);
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const { t } = useTranslation();
  return (
    <div className="py-2 md:py-16 gap-8 flex flex-col">
      <div className="flex items-center flex-col gap-8 mb-24 md:flex-row">
        <SocialStoriesModal />
        <SocialPostHeader
          name={postCardInfo.profileInfo.name}
          thumbnail={postCardInfo.profileInfo.thumbnail}
        />
        <PostCard
          showComments
          postInfo={postCardInfo.postInfo}
          profileInfo={postCardInfo.profileInfo}
        />
      </div>
      <p className="text-3xl font-bold w-full text-center">
        <>
          {t("view", "view")} {postCardInfo.profileInfo.name}{" "}
          {t("other_posts", "other posts")}
        </>
      </p>
      <PostCardsListWrapper cols={cols} posts={otherPosts} />
      <Button outline>{t("view_more", "view more")}</Button>
    </div>
  );
};
