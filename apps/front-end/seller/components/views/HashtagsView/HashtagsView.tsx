import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { TabType } from "types";
import {
  HashTagPostsListWrapper,
  PostCardsListWrapper,
  ShopCardsListWrapper,
  TabsViewer,
  Divider,
  HStack,
  Button,
  SocialServicePostsList,
  getRandomImage,
} from "ui";
import {
  ShopCardsInfoPlaceholder,
  hashTagCardsInfoPlaceholder,
  newsfeedPosts,
} from "placeholder";
import { useBreakpointValue } from "utils";
import { AttachmentType } from "@features/API";

export const HashtagsView: React.FC = () => {
  const HashtagsDataPlaceholder = newsfeedPosts.map((post, i) => ({
    ...post.postInfo,
    profile: post.profileInfo,
    listTitle: "",
  }));
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const { t } = useTranslation();
  const router = useRouter();
  const { tag } = router.query;

  const tabs: TabType[] = [
    {
      name: t("Newsfeed"),
      component: (
        <div className="flex flex-col gap-16">
          <HashTagPostsListWrapper hashtags={HashtagsDataPlaceholder} />
          <PostCardsListWrapper grid posts={newsfeedPosts} />
        </div>
      ),
    },
    {
      name: t("Shop"),
      component: (
        <div className="flex flex-col gap-16">
          <HashTagPostsListWrapper hashtags={HashtagsDataPlaceholder} />
          <Divider />
          <ShopCardsListWrapper cols={cols} items={[]} />
        </div>
      ),
    },
    {
      name: t("Service"),
      component: (
        <div className="flex flex-col gap-16">
          <HashTagPostsListWrapper hashtags={HashtagsDataPlaceholder} />
          <Divider />
          <SocialServicePostsList posts={[]} />
        </div>
      ),
    },
    // {
    //   name: t("Action"),
    //   component: (
    //     <div className="flex flex-col gap-16">
    //       <HashTagPostsListWrapper hashtags={hashTagCardsInfoPlaceholder} />
    //       <Divider />
    //       <ActionsListWrapper cols={cols} actions={actionsPlaceholders} />
    //     </div>
    //   ),
    // },
  ];
  return (
    <div className="flex flex-col p-4 items-center">
      <HStack className="px-2 w-full justify-between">
        <div></div>
        <p className="font-bold text-[3em]">#{tag}</p>
        <Button>{t("Follow")}</Button>
      </HStack>
      <TabsViewer tabs={tabs} />
    </div>
  );
};
