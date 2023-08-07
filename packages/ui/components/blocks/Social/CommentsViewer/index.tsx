import React from "react";
import { PostCommentCardProps } from "@UI";
import { ScrollableContainer } from "@UI";
import { mapArray } from "@UI/../utils/src";
import { CommentCard } from "@features/Social/components/Drawers/CommentsDrawer";
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
          <CommentCard
            comment={{
              hostUserId: comment.hostUserId,
              content: comment.content,
              createdAt: comment.createdAt,
              id: comment.id,
              attachment: comment.attachment,
              user: {
                id: comment.author?.id,
                name: comment.author?.username,
                photo: comment.author?.photo,
                verified: comment.author?.verified,
              },
            }}
            key={i}
          />
        ))}
      </ScrollableContainer>
    </>
  );
};
