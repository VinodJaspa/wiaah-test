import { useBreakpointValue, Flex, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import React from "react";
import { PostCardInfo } from "types";
import { PostCardPlaceHolder, newsfeedPosts } from "ui/placeholder";
import { useTranslation } from "react-i18next";
import { PostCardsListWrapper, GeneralPostView, Carousel } from "ui";

export interface NewsFeedPostViewProps {
  postId: string;
}

export const NewsFeedPostView: React.FC<NewsFeedPostViewProps> = ({
  postId,
}) => {
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const { t } = useTranslation();
  const router = useRouter();

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
    <GeneralPostView postId={postId} allPostsData={newsfeedPosts}>
      <PostCardsListWrapper cols={cols} posts={otherPosts} popup={false} />
    </GeneralPostView>
  );
};
