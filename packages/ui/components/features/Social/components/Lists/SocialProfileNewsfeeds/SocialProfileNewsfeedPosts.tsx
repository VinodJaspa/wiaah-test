import {
  PostCardsListWrapper,
  PostCardsListWrapperProps,
  usePaginationControls,
} from "@blocks";
import { NewsfeedPost, useGetProfilePosts } from "@features/Social/services";
import { Pagination } from "@partials";
import React from "react";

export const SocialProfileNewsfeedPosts: React.FC<
  Omit<PostCardsListWrapperProps, "posts"> & {
    userId: string;
  }
> = ({ userId, ...props }) => {
  const { pagination, controls } = usePaginationControls();
  const { data: posts } = useGetProfilePosts({
    userId,
    pagination,
  });

  return (
    <Pagination controls={controls}>
      <PostCardsListWrapper {...props} posts={posts as NewsfeedPost[]} />;
    </Pagination>
  );
};
