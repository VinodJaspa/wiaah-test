import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { TabType } from "types";
import {
  ActionsListWrapper,
  HashTagPostsListWrapper,
  PostCardsListWrapper,
  ShopCardsListWrapper,
  TabsViewer,
  Divider,
  HStack,
  Button,
  SocialServicePostsList,
} from "ui";
import {
  newsfeedPosts,
  ShopCardsInfoPlaceholder,
  hashTagCardsInfoPlaceholder,
  actionsPlaceholders,
} from "placeholder";
import { useBreakpointValue } from "utils";

export const HashtagsView: React.FC = () => {
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const { t } = useTranslation();
  const router = useRouter();
  const { tag } = router.query;

  const tabs: TabType[] = [
    {
      name: t("Newsfeed"),
      component: (
        <div className="flex flex-col gap-16">
          <HashTagPostsListWrapper hashtags={hashTagCardsInfoPlaceholder} />
          <Divider />
          <PostCardsListWrapper cols={cols} posts={newsfeedPosts} />
        </div>
      ),
    },
    {
      name: t("Shop"),
      component: (
        <div className="flex flex-col gap-16">
          <HashTagPostsListWrapper hashtags={hashTagCardsInfoPlaceholder} />
          <Divider />
          <ShopCardsListWrapper cols={cols} items={ShopCardsInfoPlaceholder} />
        </div>
      ),
    },
    {
      name: t("Service"),
      component: (
        <div className="flex flex-col gap-16">
          <HashTagPostsListWrapper hashtags={hashTagCardsInfoPlaceholder} />
          <Divider />
          <SocialServicePostsList />
        </div>
      ),
    },
    {
      name: t("Action"),
      component: (
        <div className="flex flex-col gap-16">
          <HashTagPostsListWrapper hashtags={hashTagCardsInfoPlaceholder} />
          <Divider />
          <ActionsListWrapper cols={cols} actions={actionsPlaceholders} />
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col items-center">
      <HStack className="px-2 w-full justify-between">
        <div></div>
        <p className="font-bold text-[3em]">#{tag}</p>
        <Button>{t("Follow")}</Button>
      </HStack>
      <TabsViewer tabs={tabs} />
    </div>
  );
};
