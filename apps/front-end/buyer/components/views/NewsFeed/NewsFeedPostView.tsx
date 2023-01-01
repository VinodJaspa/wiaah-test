import { useBreakpointValue, Flex, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import React from "react";
import { PostCardInfo } from "types";
import { PostCardPlaceHolder, newsfeedPosts } from "ui/placeholder";
import { useTranslation } from "react-i18next";
import {
  SocialStoryModal,
  SocialPostHeader,
  PostCard,
  PostCardsListWrapper,
} from "ui";

export interface NewsFeedPostViewProps {}

export const NewsFeedPostView: React.FC<NewsFeedPostViewProps> = () => {
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const { t } = useTranslation();
  const router = useRouter();

  const post = PostCardPlaceHolder;
  const { data: _post, isLoading: PostIsLoading } = useQuery<PostCardInfo>([
    "newsFeedPost",
    { postId: router.query.postId },
    () => {
      return PostCardPlaceHolder;
    },
  ]);

  const otherPosts = newsfeedPosts;
  const { data: _otherPosts, isLoading: otherPostsIsLoading } = useQuery<
    PostCardInfo[]
  >([
    "newsFeedPost",
    { postId: router.query.postId },
    () => {
      return newsfeedPosts;
    },
  ]);

  return (
    <Flex pb={{ base: "0.5rem", md: "4rem" }} gap="2rem" direction={"column"}>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap="2rem"
        mb="6rem"
        align={"start"}
      >
        <SocialStoryModal />
        <SocialPostHeader
          name={post.profileInfo.name}
          thumbnail={post.profileInfo.thumbnail}
        />
        <PostCard
          showComments
          postInfo={post.postInfo}
          profileInfo={post.profileInfo}
        />
      </Flex>
      <Text
        fontSize={"xx-large"}
        fontWeight="bold"
        w="100%"
        textAlign={"center"}
        textTransform={"capitalize"}
      >
        {t("view", "view")} {post.profileInfo.name}{" "}
        {t("other_posts", "other posts")}
      </Text>
      <PostCardsListWrapper cols={cols} posts={otherPosts} />
      <Button
        _focus={{ ringColor: "primary.main" }}
        bgColor="white"
        borderWidth={"0.25rem"}
        borderColor="gray"
        mt="2rem"
        fontSize={"xl"}
        color="black"
        py="0.5rem"
        textTransform={"capitalize"}
      >
        {t("view_more", "view more")}
      </Button>
    </Flex>
  );
};
