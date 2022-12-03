import { useRouter } from "next/router";
import { useQuery } from "react-query";
import React from "react";
import { PostCardInfo } from "types";
import { PostCardPlaceHolder, newsfeedPosts } from "ui/placeholder";
import { useTranslation } from "react-i18next";
import { Button, PostCard, PostCardsListWrapper, PostCommentCard } from "ui";
import { useBreakpointValue } from "utils";

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
    <div className="flex flex-col gap-8 pt-8">
      <div className="flex overflow-hidden flex-col h-[50rem] md:flex-row gap-8 items-start">
        <PostCard postInfo={post.postInfo} profileInfo={post.profileInfo} />
        <div className="flex flex-col h-full overflow-scroll thinScroll gap-4 w-[min(35rem,100%)]">
          {post
            ? post.postInfo.comments.map((post, i) => (
                <PostCommentCard key={i} {...post} />
              ))
            : null}
        </div>
      </div>
      <p className="text-3xl font-bold w-full text-center">
        {t("View")} {post.profileInfo.name} {t("Other posts")}
      </p>
      <PostCardsListWrapper
        cols={cols}
        posts={[...Array(5)].reduce((acc) => {
          return [...acc, ...otherPosts];
        }, [])}
      />
      <Button>{t("View More")}</Button>
    </div>
  );
};
