import React from "react";
import { PostComment } from "types/market/Social";
import { Flex, Text, Box } from "@chakra-ui/react";
import { PostCommentCard } from "ui";
import { useTranslation } from "react-i18next";
import { ScrollableContainer } from "../../DataDisplay";
export interface CommentsViewerProps {
  comments: PostComment[];
  maxInitailComments?: number;
}

export const CommentsViewer: React.FC<CommentsViewerProps> = ({
  comments,
  maxInitailComments,
}) => {
  return (
    <>
      <ScrollableContainer maxInitialItems={maxInitailComments}>
        {comments.map((comment, i) => (
          <PostCommentCard {...comment} key={i} />
        ))}
      </ScrollableContainer>
    </>
  );
};
