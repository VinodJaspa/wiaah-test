import {
  PostCardsListWrapper,
  PostCardsListWrapperProps,
  usePaginationControls,
} from "@blocks";
import { PostType } from "@features/API";
import { useGetProfilePosts } from "@features/Social/services";
import { Pagination } from "@partials";
import { newsfeedPosts } from "@UI/placeholder";
import React from "react";

export const SocialProfileNewsfeedPosts: React.FC<
  Omit<PostCardsListWrapperProps, "posts"> & {
    userId: string;
  }
> = ({ userId, ...props }) => {
  const { pagination, controls } = usePaginationControls();
  // use this graphql query only if the server is ready if not use placehoder data
  const { data: posts } = useGetProfilePosts({
    userId,
    pagination,
    type: PostType.NewsfeedPost,
  });

  return (
    <>
      {newsfeedPosts ? (
        <PostCardsListWrapper {...props} posts={newsfeedPosts} />
      ) : null}
      <Pagination controls={controls} />
    </>
  );
};
