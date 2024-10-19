import { ScrollableContainer } from "../../../blocks/DataDisplay";
import React from "react";
import { mapArray } from "utils";
import { CommentCard } from "../../../features/Social/components/Drawers/CommentsDrawer";
import { PostCommentCardProps } from "../PostCommentCard";
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
              hostUserId: comment.hostId,
              content: comment.content,
              createdAt: comment.commentedAt,
              id: comment.id,
              user: {
                id: comment.author?.id || "",
                name: comment.author?.username || "",
                photo: comment.author?.photo || "",
                verified: comment.author?.verified!,
              },
            }}
            key={i}
          />
        ))}
      </ScrollableContainer>
    </>
  );
};
