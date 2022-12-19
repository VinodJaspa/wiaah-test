import { PostCommentType } from "api";
import React from "react";
import { PostCommentCard } from "@UI";
import { ScrollableContainer } from "@UI";
export interface CommentsViewerProps {
  comments: PostCommentType[];
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
