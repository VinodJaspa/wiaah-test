import React from "react";
import { PostCardInfo } from "types/market/Social";
import { Flex } from "@chakra-ui/react";
import {
  ListWrapper,
  ListWrapperProps,
  PostCard,
  GridWrapper,
  PostAttachment,
} from "ui";

export interface PostCardsListWrapperProps extends ListWrapperProps {
  posts: PostCardInfo[];
  cols?: number;
  onPostClick?: (post: PostCardInfo) => any;
  grid?: boolean;
}

export const PostCardsListWrapper: React.FC<PostCardsListWrapperProps> = ({
  posts,
  cols = 1,
  onPostClick,
  grid,
  ...props
}) => {
  if (grid) {
    return (
      <GridWrapper
        cols={cols}
        itemProps={{ bgColor: "black" }}
        items={posts.map((post, i) => ({
          displayVariant:
            i < 2
              ? "portrait"
              : i === 4
              ? "landscape"
              : i === 6
              ? "large"
              : "normal",
          component: (
            <PostAttachment
              blur
              minimal
              controls={false}
              key={i}
              src={
                (post.postInfo.attachments &&
                  post.postInfo.attachments[0].src) ||
                ""
              }
              type={
                (post.postInfo.attachments &&
                  post.postInfo.attachments[0].type) ||
                ""
              }
            />
          ),
        }))}
      />
    );
  } else {
    return (
      <ListWrapper {...props} cols={cols}>
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
  }
};
