import { usePagination } from "hooks";
import React from "react";
import {
  useGetPostCommentsQuery,
  CommentInput,
  CommentsViewer,
  SpinnerFallback,
} from "@UI";

export interface PostCommentsListProps {
  postId: string;
}
export const PostCommentsList: React.FC<PostCommentsListProps> = ({
  postId,
}) => {
  const { page, take } = usePagination();
  const {
    data: res,
    isLoading,
    isError,
  } = useGetPostCommentsQuery({ id: postId }, { page, take });
  return (
    <SpinnerFallback isLoading={isLoading} isError={isError}>
      {res ? (
        <CommentsViewer maxInitailComments={4} comments={res?.data} />
      ) : null}
    </SpinnerFallback>
  );
};
