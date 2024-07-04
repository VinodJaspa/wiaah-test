import React from "react";
import { TabType } from "types";
import { useRouter } from "next/router";
import {
  HashTagPostsListWrapper,
  PostCardsListWrapper,
  ShopCardsListWrapper,
  TabsViewer,
  Button,
  Divider,
  SocialServicePostsList,
  HomeIcon,
  HStack,
  ServicesIcon,
  ShoppingCartIcon,
  useGetTopHashtagPostsQuery,
  useGetTopHashtagServicePost,
  newsFeedPostIdState,
} from "ui";
import {
  newsfeedPosts,
  ShopCardsInfoPlaceholder,
  SocialShopCardsInfoPlaceholder,
} from "placeholder";
import { useTranslation } from "react-i18next";
import { useBreakpointValue } from "utils";

const randomNum = (max: number) => Math.floor(Math.random() * max);

export interface HashTagViewProps {
  tag: string;
}

export const HashTagView: React.FC<HashTagViewProps> = ({ tag }) => {
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const { data: newsfeedHashtagPosts } = useGetTopHashtagPostsQuery(tag);
  const { data: servicePostHashtagPosts } = useGetTopHashtagServicePost({
    tag,
  });

  const { t } = useTranslation();

  function handleFollowHashtag() { }

  const tabs: TabType[] = [
    {
      name: (
        <HStack>
          <p>{t("Newsfeed")}</p>
          <HomeIcon />
        </HStack>
      ),
      component: (
        <div className="flex flex-col gap-16">
          <HashTagPostsListWrapper hashtags={newsfeedHashtagPosts} />
          <Divider />
          <PostCardsListWrapper cols={3} posts={newsfeedPosts} />
        </div>
      ),
    },
    {
      name: (
        <HStack>
          <p>{t("Service")}</p>
          <ServicesIcon />
        </HStack>
      ),
      component: (
        <div className="flex flex-col w-full gap-16">
          <HashTagPostsListWrapper hashtags={newsfeedHashtagPosts} />
          <Divider />
          <SocialServicePostsList posts={[]} />
        </div>
      ),
    },
    {
      name: (
        <HStack>
          <p>{t("Shop")}</p>
          <ShoppingCartIcon />
        </HStack>
      ),
      component: (
        <div className="flex flex-col gap-16">
          <HashTagPostsListWrapper hashtags={newsfeedHashtagPosts} />

          <Divider />

          <ShopCardsListWrapper
            cols={cols}
            items={SocialShopCardsInfoPlaceholder}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col my-8">
      <div className="flex w-full px-2 justify-between">
        <div></div>
        <div className="flex flex-col w-full gap-2 items-center">
          <p className="font-bold text-2xl">#{tag}</p>
          <p className="font-bold text-xl">{`${randomNum(500)}M ${t(
            "Views"
          )}`}</p>
        </div>
        <Button
          onClick={() => {
            handleFollowHashtag();
          }}
        >
          {t("Follow")}
        </Button>
      </div>
      <TabsViewer tabs={tabs} />
    </div>
  );
};
