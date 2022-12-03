import React from "react";
import { useRecoilValue } from "recoil";
import { useBreakpointValue } from "@chakra-ui/react";
import { SocialHashTagTopPosts } from "ui/state";
import { TabType } from "types";
import { useRouter } from "next/router";
import {
  ActionsListWrapper,
  actionsPlaceholders,
  HashTagPostsListWrapper,
  PostCardsListWrapper,
  ShopCardsListWrapper,
  TabsViewer,
  Button,
  Divider,
  SocialServicePostsList,
  HomeIcon,
  HStack,
  PlayButtonFillIcon,
  ServicesIcon,
  ShoppingCartIcon,
} from "ui";
import { newsfeedPosts, ShopCardsInfoPlaceholder } from "placeholder";
import { useTranslation } from "react-i18next";
import { randomNum } from "utils";

export interface HashTagViewProps {}

export const HashTagView: React.FC<HashTagViewProps> = () => {
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const topPosts = useRecoilValue(SocialHashTagTopPosts);

  const { t } = useTranslation();

  const router = useRouter();
  const { tag } = router.query;

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
          <HashTagPostsListWrapper hashtags={topPosts} />
          <Divider />
          <PostCardsListWrapper
            cols={3}
            posts={newsfeedPosts.concat(newsfeedPosts)}
          />
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
          <HashTagPostsListWrapper hashtags={topPosts} />
          <Divider />
          <SocialServicePostsList />
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
          <HashTagPostsListWrapper hashtags={topPosts} />

          <Divider />

          <ShopCardsListWrapper cols={cols} items={ShopCardsInfoPlaceholder} />
        </div>
      ),
    },
    {
      name: (
        <HStack>
          <p>{t("Actions")}</p>
          <PlayButtonFillIcon />
        </HStack>
      ),
      component: (
        <div className="flex flex-col gap-16">
          <HashTagPostsListWrapper hashtags={topPosts} />
          <Divider />
          <ActionsListWrapper cols={cols} actions={actionsPlaceholders} />
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
        <Button>{t("Follow")}</Button>
      </div>
      <TabsViewer tabs={tabs} />
    </div>
  );
};
