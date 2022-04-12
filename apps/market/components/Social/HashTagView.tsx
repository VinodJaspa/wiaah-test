import React from "react";
import { useRecoilValue } from "recoil";
import {
  Flex,
  HStack,
  Text,
  Button,
  Box,
  useBreakpointValue,
  Divider,
} from "@chakra-ui/react";
import { SocialHashTagTopPosts } from "ui/state";
import { TabType } from "types/market/misc/tabs";
import { useRouter } from "next/router";
import { t } from "i18next";
import {
  FilterModal,
  HashTagPostsListWrapper,
  ListWrapper,
  PostCardsListWrapper,
  ShopCardsListWrapper,
  TabsViewer,
} from "ui";
import { newsfeedPosts, ShopCardsInfoPlaceholder } from "ui/placeholder/social";

export interface HashTagViewProps {}

export const HashTagView: React.FC<HashTagViewProps> = () => {
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const router = useRouter();
  const { tag } = router.query;

  const tabs: TabType[] = [
    {
      name: t("news_feed", "news feed"),
      component: (
        <Flex direction={"column"} gap="4rem">
          <HashTagPostsListWrapper />
          <Divider />
          <PostCardsListWrapper cols={cols} posts={newsfeedPosts} />
        </Flex>
      ),
    },
    {
      name: t("shop", "shop"),
      component: (
        <Flex direction={"column"} gap="4rem">
          <HashTagPostsListWrapper />

          <Divider />

          <ShopCardsListWrapper cols={cols} items={ShopCardsInfoPlaceholder} />
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
