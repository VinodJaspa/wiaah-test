import {
  useBreakpointValue,
  Flex,
  HStack,
  Divider,
  Button,
  Text,
} from "@chakra-ui/react";
import { t } from "i18next";
import { useRouter } from "next/router";
import React from "react";
import { TabType } from "types";
import {
  HashTagPostsListWrapper,
  PostCardsListWrapper,
  ShopCardsListWrapper,
  TabsViewer,
} from "ui";
import {
  newsfeedPosts,
  ShopCardsInfoPlaceholder,
  hashTagCardsInfoPlaceholder,
} from "ui/placeholder";

export const HashtagsView: React.FC = () => {
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const router = useRouter();
  const { tag } = router.query;

  const tabs: TabType[] = [
    {
      name: t("news_feed", "news feed"),
      component: (
        <Flex direction={"column"} gap="4rem">
          <HashTagPostsListWrapper hashtags={hashTagCardsInfoPlaceholder} />
          <Divider />
          <PostCardsListWrapper cols={cols} posts={newsfeedPosts} />
        </Flex>
      ),
    },
    {
      name: t("shop", "shop"),
      component: (
        <Flex direction={"column"} gap="4rem">
          <HashTagPostsListWrapper hashtags={hashTagCardsInfoPlaceholder} />
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
