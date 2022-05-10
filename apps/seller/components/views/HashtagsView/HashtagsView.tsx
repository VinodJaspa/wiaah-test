import {
  useBreakpointValue,
  Flex,
  HStack,
  Divider,
  Button,
  Text,
} from "@chakra-ui/react";
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
} from "ui";
import {
  newsfeedPosts,
  ShopCardsInfoPlaceholder,
  hashTagCardsInfoPlaceholder,
  actionsPlaceholders,
} from "ui/placeholder";

export const HashtagsView: React.FC = () => {
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const { t } = useTranslation();
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
    {
      name: t("action", "Action"),
      component: (
        <Flex direction={"column"} gap="4rem">
          <HashTagPostsListWrapper hashtags={hashTagCardsInfoPlaceholder} />
          <Divider />
          <ActionsListWrapper cols={cols} actions={actionsPlaceholders} />
        </Flex>
      ),
    },
  ];
  return (
    <Flex direction={"column"} align={"center"}>
      <HStack px="0.5rem" justify={"space-between"}>
        <Text fontWeight={"bold"} fontSize="3em">
          #{tag}
        </Text>
        <Button size={"sm"} textTransform={"capitalize"}>
          {t("follow", "follow")}
        </Button>
      </HStack>
      <TabsViewer tabs={tabs} />
    </Flex>
  );
};
