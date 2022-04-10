import React from "react";
import { Avatar, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { PostCard, PostCardsListWrapper } from "ui";
import { useRecoilValue } from "recoil";
import {
  SocialNewsfeedOtherPosts,
  SocialNewsfeedPost,
} from "ui/state/Recoil/Social";
import { t } from "i18next";

export const NewsFeedPostView: React.FC = () => {
  const postCardInfo = useRecoilValue(SocialNewsfeedPost);
  const otherPosts = useRecoilValue(SocialNewsfeedOtherPosts);

  return (
    <Flex py="4rem" gap="2rem" direction={"column"}>
      <HStack w="100%" justify={"space-between"}>
        <HStack>
          <Avatar
            src={postCardInfo.profileInfo.thumbnail}
            name={postCardInfo.profileInfo.name}
          />
          <Text>{postCardInfo.profileInfo.name}</Text>
        </HStack>
        <Button
          _focus={{ ring: "0" }}
          colorScheme={"primary"}
          textTransform={"capitalize"}
        >
          {t("follow", "follow")}
        </Button>
      </HStack>
      <PostCard
        postInfo={postCardInfo.postInfo}
        profileInfo={postCardInfo.profileInfo}
      />
      <Text
        fontSize={"xx-large"}
        fontWeight="bold"
        w="100%"
        textAlign={"center"}
        textTransform={"capitalize"}
      >
        {t("view", "view")} {postCardInfo.profileInfo.name}{" "}
        {t("other_posts", "other posts")}
      </Text>
      <PostCardsListWrapper posts={otherPosts} />
    </Flex>
  );
};
