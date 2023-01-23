import React from "react";
import { PostCommentCard, PostCommentCardProps } from "@UI";
import { ScrollableContainer } from "@UI";
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
        {comments.map((comment, i) => (
          <PostCommentCard comment={comment} key={i} />
        ))}
      </ScrollableContainer>
    </>
  );
};
