import React from "react";
import {
  CommentsViewer,
  SpinnerFallback,
  useGetContentCommentsQuery,
} from "@UI";
import { Comment } from "@features/API";

export interface PostCommentsListProps {
  postId: string;
}
export const PostCommentsList: React.FC<PostCommentsListProps> = ({
  postId,
}) => {
  const [cursor, setCursor] = React.useState<string>();
  const { isLoading, isError, data } = useGetContentCommentsQuery({
    id: postId,
    take: 10,
    cursor,
  });

  return (
    <SpinnerFallback isLoading={isLoading} isError={isError}>
      {data ? (
        <CommentsViewer
          maxInitailComments={4}
          comments={
            data.pages.reduce(
              (acc, curr) => acc.concat(curr.data || []),
              [] as Comment[]
            ) || []
          }
        />
      ) : null}
    </SpinnerFallback>
  );
};
