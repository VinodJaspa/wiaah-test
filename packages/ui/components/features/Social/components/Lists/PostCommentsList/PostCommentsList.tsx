import React from "react";
import {
  CommentsViewer,
  SpinnerFallback,
  useGetContentCommentsQuery,
} from "@UI";
import { AttachmentType, Comment, ContentHostType } from "@features/API";
import { getRandomImage } from "placeholder";

const FAKE_CONTENT_COMMENT = {
  data: [
    {
      id: "comment1",
      content: "This is a sample comment content.",
      commentedAt: "2024-06-17T12:00:00Z",
      likes: 10,
      userId: "user1",
      hostId: "post1",
      hostType: ContentHostType.Comment,
      updatedAt: "2024-06-17T12:05:00Z",
      replies: 7,
      attachment: {
        src: getRandomImage(),
        type: AttachmentType.Img,
      },
      author: {
        username: "user1",
        photo: "https://example.com/photo.jpg",
        verified: true,
        id: "profile1",
      },
    },
    {
      id: "comment2",
      content: "Another example comment.",
      commentedAt: "2024-06-17T13:00:00Z",
      likes: 5,
      userId: "user2",
      hostId: "post1",
      hostType: ContentHostType.Comment,
      updatedAt: "2024-06-17T13:10:00Z",
      replies: 6,
      attachment: {
        src: getRandomImage(),
        type: AttachmentType.Img,
      },
      author: {
        username: "user2",
        photo: getRandomImage(),
        verified: true,
        id: "profile2",
      },
    },
  ],
};

export interface PostCommentsListProps {
  postId: string;
}
export const PostCommentsList: React.FC<PostCommentsListProps> = ({
  postId,
}) => {
  const [cursor, setCursor] = React.useState<string>();
  const {
    isLoading,
    isError,
    data: _data,
  } = useGetContentCommentsQuery({
    id: postId,
    take: 10,
    cursor,
  });
  const data = FAKE_CONTENT_COMMENT;

  return (
    <SpinnerFallback isLoading={isLoading} isError={isError}>
      {data.data ? (
        <CommentsViewer
          maxInitailComments={4}
          comments={data.data}
        //NOTE: use this when the graphql query is ready
        // comments={
        //   data.pages.reduce(
        //     (acc, curr) => acc.concat(curr.data || []),
        //     [] as Comment[]
        //   ) || []
        // }
        />
      ) : null}
    </SpinnerFallback>
  );
};
