import React from "react";
import {
  PostCard,
  PostCardsListWrapper,
  SocialPostHeader,
  Button,
  useGetNewsfeedPostQuery,
  useGetNewsFeedPostQuery,
  useGetMyNewsfeedPostsQuery,
  CommentsViewer,
  useGetContentCommentsQuery,
  SocialProfileNewsfeedPosts,
} from "ui";
import { useTranslation } from "react-i18next";
import { useBreakpointValue } from "utils";
import { PostCommentPlaceholder } from "placeholder";

export const PostView: React.FC = () => {
  const { data: post } = useGetNewsfeedPostQuery("");
  const { data: posts } = useGetMyNewsfeedPostsQuery({
    pagination: { page: 1, take: 2 },
  });
  const { data: comments } = useGetContentCommentsQuery({ id: "" });
  const cols = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const { t } = useTranslation();
  return (
    <div className="p-2 md:py-16 gap-8 flex flex-col">
      <div className="flex items-center flex-col gap-8 mb-24 md:flex-row">
        {post?.profileInfo && (
          <SocialPostHeader
            name={post?.profileInfo.name}
            thumbnail={post?.profileInfo.photo}
          />
        )}
        {post ? (
          <>
            <PostCard post={post} />
            <CommentsViewer comments={comments || []} />
          </>
        ) : null}
      </div>
      <p className="text-3xl font-bold w-full text-center">
        <>
          {t("view", "view")} {post?.profileInfo.name}{" "}
          {t("other_posts", "other posts")}
        </>
      </p>
      <SocialProfileNewsfeedPosts grid userId={post?.userId} />
      <Button outline>{t("view_more", "view more")}</Button>
    </div>
  );
};
