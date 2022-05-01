import React from "react";
import { PostCardInfo } from "types/market/Social";
import { Flex } from "@chakra-ui/react";
import { PostCard } from "ui";
import { ListWrapper } from "ui";

export interface PostCardsListWrapperProps {
  posts: PostCardInfo[];
  cols?: number;
  onPostClick?: (post: PostCardInfo) => any;
}

export const PostCardsListWrapper: React.FC<PostCardsListWrapperProps> = ({
  posts,
  cols = 1,
  onPostClick,
}) => {
  return (
    <ListWrapper cols={cols}>
      {posts &&
        posts.map((post) => (
          <PostCard
            innerProps={{ onClick: () => onPostClick && onPostClick(post) }}
            {...post}
            key={post.postInfo.id}
          />
        ))}
    </ListWrapper>
  );
};
