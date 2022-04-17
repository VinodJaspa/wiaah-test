import React from "react";
import { PostCardInfo } from "types/market/Social";
import { SimpleGrid, Grid, Wrap, WrapItem, Flex } from "@chakra-ui/react";
import { PostCard } from "ui";

export interface PostCardsListWrapperProps {
  posts: PostCardInfo[];
  cols?: number;
}

export const PostCardsListWrapper: React.FC<PostCardsListWrapperProps> = ({
  posts,
  cols = 1,
}) => {
  function sort<T>(items: T[], cols: number): { item: T; postion: number }[] {
    let postion = 0;
    const newItems: { item: T; postion: number }[] = [];

    items.map((item) => {
      if (postion >= cols) postion = 0;
      newItems.push({ item, postion });
      postion++;
    });

    return newItems;
  }
  return (
    <Flex justify={"space-between"} gap="1rem">
      {[...Array(cols)].map((_, index) => (
        <Flex w="100%" gap="1rem" direction={"column"} key={index}>
          {sort(posts, cols).map(
            ({ item: { postInfo, profileInfo }, postion }, i) =>
              postion == index && (
                <Flex direction={"column"} key={i}>
                  <PostCard
                    showComments
                    profileInfo={profileInfo}
                    postInfo={postInfo}
                  />
                </Flex>
              )
          )}
        </Flex>
      ))}
    </Flex>
  );
};
