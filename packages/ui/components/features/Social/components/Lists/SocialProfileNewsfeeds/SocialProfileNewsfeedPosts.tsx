import {
  PostCardsListWrapper,
  PostCardsListWrapperProps,
  usePaginationControls,
} from "@blocks";
import { useGetProfilePosts } from "@features/Social/services";
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
    <>
      {posts ? <PostCardsListWrapper {...props} posts={posts} /> : null}
      <Pagination controls={controls} />
    </>
  );
};
