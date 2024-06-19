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
  HashTagPostsListWrapper,
  newsFeedPostIdState,
  PostCardsListWrapper,
  ShopCardsListWrapper,
  SocialProfileActionList,
  TabsViewer,
} from "ui";
import {
  newsfeedPosts,
  ShopCardsInfoPlaceholder,
  hashTagCardsInfoPlaceholder,
  actionsPlaceholders,
} from "ui/placeholder";
import { SocialShopCardsInfoPlaceholder } from "placeholder";

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
      name: t("news_feed", "news feed"),
      component: (
        <Flex direction={"column"} gap="4rem">
          <HashTagPostsListWrapper hashtags={HashtagsDataPlaceholder} />
          <Divider />
          <PostCardsListWrapper cols={cols} posts={newsfeedPosts} />
        </Flex>
      ),
    },
    {
      name: t("shop", "shop"),
      component: (
        <Flex direction={"column"} gap="4rem">
          <ShopCardsListWrapper
            cols={cols}
            items={SocialShopCardsInfoPlaceholder}
          />
        </Flex>
      ),
    },
    {
      name: t("action", "Action"),
      component: (
        <Flex direction={"column"} gap="4rem">
          <SocialProfileActionList userId="" />
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
