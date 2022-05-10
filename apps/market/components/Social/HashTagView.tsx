import React from "react";
import { useRecoilValue } from "recoil";
import {
  Flex,
  HStack,
  Text,
  Button,
  useBreakpointValue,
  Divider,
} from "@chakra-ui/react";
import { SocialHashTagTopPosts } from "ui/state";
import { TabType } from "types/market/misc/tabs";
import { useRouter } from "next/router";
import {
  ActionsListWrapper,
  actionsPlaceholders,
  HashTagPostsListWrapper,
  PostCardsListWrapper,
  ShopCardsListWrapper,
  TabsViewer,
} from "ui";
import { newsfeedPosts, ShopCardsInfoPlaceholder } from "ui/placeholder/social";
import { useTranslation } from "react-i18next";

export interface HashTagViewProps {}

export const HashTagView: React.FC<HashTagViewProps> = () => {
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const topPosts = useRecoilValue(SocialHashTagTopPosts);

  const { t } = useTranslation();

  const router = useRouter();
  const { tag } = router.query;

  const tabs: TabType[] = [
    {
      name: t("news_feed", "news feed"),
      component: (
        <Flex direction={"column"} gap="4rem">
          <HashTagPostsListWrapper hashtags={topPosts} />
          <Divider />
          <PostCardsListWrapper cols={cols} posts={newsfeedPosts} />
        </Flex>
      ),
    },
    {
      name: t("shop", "shop"),
      component: (
        <Flex direction={"column"} gap="4rem">
          <HashTagPostsListWrapper hashtags={topPosts} />

          <Divider />

          <ShopCardsListWrapper cols={cols} items={ShopCardsInfoPlaceholder} />
        </Flex>
      ),
    },
    {
      name: t("action", "action"),
      component: (
        <Flex direction={"column"} gap="4rem">
          <HashTagPostsListWrapper hashtags={topPosts} />
          <Divider />
          <ActionsListWrapper cols={cols} actions={actionsPlaceholders} />
        </Flex>
      ),
    },
  ];
  return (
    <Flex direction={"column"} my="2rem">
      <HStack px="0.5rem" justify={"space-between"} w="100%">
        <Button visibility={"hidden"} textTransform={"capitalize"}>
          {t("follow", "follow")}
        </Button>
        <Text fontWeight={"bold"} fontSize="x-large">
          #{tag}
        </Text>
        <Button textTransform={"capitalize"}>{t("follow", "follow")}</Button>
      </HStack>
      <TabsViewer tabs={tabs} />
    </Flex>
  );
};
