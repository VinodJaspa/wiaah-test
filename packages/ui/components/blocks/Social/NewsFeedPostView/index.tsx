
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useMediaQuery } from "react-responsive";
import { PostCardInfo } from "types";
import { GeneralPostView, PostCardsListWrapper } from "ui";
import { PostCardPlaceHolder, newsfeedPosts } from "ui/placeholder";

export interface NewsFeedPostViewProps {
  postId: string;
}

export const NewsFeedPostView: React.FC<NewsFeedPostViewProps> = ({
  postId,
}) => {

const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const isBase = useMediaQuery({ maxWidth: 767 }); 
  const isMd = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isLg = useMediaQuery({ minWidth: 1024 }); 
  const cols = isBase ? 1 : isMd ? 2 : isLg ? 3 : 1;
  


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
