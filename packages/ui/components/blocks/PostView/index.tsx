import { BookingLinkBanner } from "@blocks/BookingLinkBanner";
import {
  CommentInput,
  PostCommentCard,
  PostCommentCardProps,
} from "@blocks/Social";
import { useActionComments } from "@src/Hooks";
import React from "react";
import { useTranslation } from "react-i18next";

import { getRandomImage, PostCardPlaceHolder } from "placeholder";
import { AttachmentType, ContentHostType } from "@features/API";
import { Divider } from "@partials";

interface PostViewProps<TData> {
  renderChild: (props: TData) => React.ReactElement;
  idParam?: string;
  queryName: string;
  fetcher?: (queryFn: any) => Promise<TData | null>;
  showLink?: boolean;
  data?: TData;
  postId: string;
}

export function PostView<TData extends {}>({
  renderChild,
  idParam = "postId",
  queryName = "post",
  fetcher,
  showLink = false,
  data,
  postId,
}: PostViewProps<TData>) {
  const { CloseComments, OpenComments, ToggleComments, open } =
    useActionComments();
  const { t } = useTranslation();

  React.useEffect(() => {
    OpenComments();
  }, []);

  // const {
  //   data: post,
  //   isLoading,
  //   isError,
  // } = useQuery([queryName, { postId }], fetcher, { enabled: !!postId });
  const post = data;

  return (
    <div className="flex justify-center items-center relative w-full h-full ">
      <div className="flex w-1/2 h-full bg-black">{renderChild(post!)}</div>
      <div
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          width: open ? "50%" : "0px",
        }}
        className={`transition-all transform bg-white flex-col p-2 pr-3 gap-2 flex h-full `}
      >
        {/*Top section (Link)*/}
        <BookingLinkBanner
          showLink={showLink}
          link="https://www.figma.com/design/zou6Q"
        />
        <div className="hide-scrollbar h-full overflow-y-scroll">
          {PostCardPlaceHolder.postInfo.comments && (
            <>
              {FAKE_COMMENTS.length > 0 ? (
                FAKE_COMMENTS.map(
                  (comment: PostCommentCardProps["comment"], i: any) => (
                    <>
                      <PostCommentCard
                        main={true}
                        key={i}
                        comment={comment}
                        index={i}
                      />

                      <Divider className="my-4" />
                    </>
                  ),
                )
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p className="text-xl font-bold">
                    {t("no comments in this post")}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        <CommentInput
          onCommentSubmit={(v) => {
            // mutate({
            //   authorProfileId:
            // })
          }}
        />
      </div>
    </div>
  );
}

const FAKE_COMMENTS: PostCommentCardProps["comment"][] = [
  {
    __typename: "Comment",
    id: "cmt-123456",
    content:
      "This is the first sample comment, This is the first sample comment,This is the first sample comment, This is the first sample comment, This is the first sample comment, This is the first sample comment,This is the first sample comment, This is the first sample comment , This is the first sample comment,This is the first sample comment, This is the first sample comment",
    commentedAt: "2024-08-10T12:34:56Z",
    likes: 42,
    userId: "user-7890",
    hostId: "host-1234",
    hostType: ContentHostType.Comment,
    updatedAt: "2024-08-10T14:00:00Z",
    replies: 10,
    author: {
      __typename: "Profile",
      username: "johndoe",
      photo: getRandomImage(),
      verified: true,
      id: "profile-5678",
    },
  },

  {
    __typename: "Comment",
    id: "cmt-789012",
    content: "This is the second sample comment.",
    commentedAt: "2024-08-11T10:20:30Z",
    likes: 28,
    userId: "user-3456",
    hostId: "host-5678",
    hostType: ContentHostType.Comment,
    updatedAt: "2024-08-11T12:00:00Z",
    replies: 5,
    attachment: {
      __typename: "Attachment",
      src: getRandomImage(),
      type: AttachmentType.Img,
    },
    author: {
      __typename: "Profile",
      username: "janedoe",
      photo: getRandomImage(),
      verified: false,
      id: "profile-9012",
    },
  },

  {
    __typename: "Comment",
    id: "cmt-345678",
    content: "This is the third sample comment.",
    commentedAt: "2024-08-12T15:45:20Z",
    likes: 15,
    userId: "user-1122",
    hostId: "host-3344",
    hostType: ContentHostType.Comment,
    updatedAt: "2024-08-12T16:00:00Z",
    replies: 31,
    attachment: {
      __typename: "Attachment",
      src: getRandomImage(),
      type: AttachmentType.Img,
    },
    author: {
      __typename: "Profile",
      username: "alexsmith",
      photo: getRandomImage(),
      verified: true,
      id: "profile-3344",
    },
  },
];
