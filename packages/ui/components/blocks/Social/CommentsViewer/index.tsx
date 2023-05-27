import React from "react";
import { PostCommentCard, PostCommentCardProps } from "@UI";
import { ScrollableContainer } from "@UI";
import { mapArray } from "@UI/../utils/src";
export interface CommentsViewerProps {
  comments: PostCommentCardProps["comment"][];
  maxInitailComments?: number;
}

export const CommentsViewer: React.FC<CommentsViewerProps> = ({
  comments,
  maxInitailComments,
}) => {
  return (
    <>
      <ScrollableContainer maxInitialItems={maxInitailComments}>
        {mapArray(comments, (comment, i) => (
          <PostCommentCard comment={comment} key={i} />
        ))}
      </ScrollableContainer>
    </>
  );
};
