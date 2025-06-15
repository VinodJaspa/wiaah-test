import { BookingLinkBanner } from "@blocks/BookingLinkBanner";
import {
  CommentInput,
  PostCommentCard,
  PostCommentCardProps,
} from "@blocks/Social";
import { AttachmentType, ContentHostType } from "@features/API";
import { Button, Divider } from "@partials";
import { useActionComments } from "@src/Hooks";
import { useRouter } from "next/router";
import { getRandomImage, PostCardPlaceHolder } from "placeholder";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa";
import { HiOutlineLink } from "react-icons/hi";
import { Input } from "ui";
import { cn } from "utils";

interface PostData {
  profileInfo(profileInfo: any, arg1: string): unknown;
  affiliation?: {
    itemType?: string;
  };
  postInfo?: {
    postType?: string;
  };
}

interface PostViewProps<TData extends PostData> {
  renderChild: (props: TData) => React.ReactElement;
  idParam?: string;
  queryName: string;
  fetcher?: (queryFn: any) => Promise<TData | null>;
  showLink?: boolean;
  data?: TData;
  postId: string;
  fromAffiliation?: boolean;
  isHome?: boolean;
  isDiscover?: boolean;
}

export function PostView<TData extends PostData>({
  renderChild,
  idParam = "postId",
  queryName = "post",
  fetcher,
  showLink = false,
  data,
  postId,
  fromAffiliation,
  isHome,
  isDiscover,
}: PostViewProps<TData>) {
  const { CloseComments, OpenComments, ToggleComments, open } =
    useActionComments();
const { t } = useTranslation();
  const [shouldCommentBoxFocused, setShouldCommentBoxFocused] =
    React.useState<boolean>(false);
  const [isUsernameShowing, setIsUsernameShowing] =
    React.useState<boolean>(false);
  const [postOwnerUsername, setPostOwnerUsername] = React.useState<string>("");
  const [affiliationLink, setAffiliationLink] = useState<string>("");

  const user = undefined;

  React.useEffect(() => {
    OpenComments();
  }, []);

  // const {
  //   data: post,
  //   isLoading,
  //   isError,
  // } = useQuery([queryName, { postId }], fetcher, { enabled: !!postId });

  const post = data;
  console.log(data.profileInfo
    ,"data----");
  
  const router = useRouter();
  const handleGenerateLink = () => {
    if (!user) return;

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let affiliationId = "";
    for (let i = 0; i < 8; i++) {
      affiliationId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const generatedLink = `${process.env.NEXT_PUBLIC_BASE_URL}/affiliation/${postId}?affiliationId=${affiliationId}`;

    setAffiliationLink(generatedLink);
  };

  return (
    <div className="flex justify-center items-center relative w-full h-full ">
      <div className="flex w-1/2 h-full bg-black relative">
        {renderChild(post!)}
        <button
          onClick={() => {
             router.push(`/profile/${data?.profileInfo.name}`);
            setIsUsernameShowing(!isUsernameShowing)}

          }
          className="absolute left-5 bottom-5 w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center"
        >
          <FaUser className="text-white" />
        </button>
        {isUsernameShowing && (
          <p 
          onClick={()=>router.push(`/profile/${data?.profileInfo.name}`)}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-2 py-1 font-medium">
            Username
          </p>
        )}
      </div>
      <div
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          width: open ? "50%" : "0px",
        }}
        className={`transition-all transform bg-white flex-col p-2 pr-3 gap-2 flex h-full `}
      >
        <div
          className={cn(
            "pl-3 flex items-center gap-5",
            isDiscover ? "justify-end" : "justify-between",
          )}
        >
          {fromAffiliation && (
            <div className="w-full flex border-2 border-primary rounded-xl align-center h-12">
              <div
                onClick={handleGenerateLink}
                className="flex justify-center items-center h-full border-r border-gray-200 px-4 cursor-pointer text-gray-500"
              >
                <HiOutlineLink />
              </div>

              <Input
                onClick={
                  !user
                    ? () => {
                        console.log("Input Clicked");
                      }
                    : undefined
                }
                value={affiliationLink}
                onChange={() => {}}
              />
            </div>
          )}
          {!isHome &&
            !isDiscover &&
            post?.affiliation?.itemType === "service" && (
              <Button className="text-primary flex-shrink-0 whitespace-nowrap font-medium">
                Book Now
              </Button>
            )}
          {!isHome &&
            !isDiscover &&
            post?.affiliation?.itemType === "product" && (
              <Button className="text-primary flex-shrink-0 whitespace-nowrap font-medium">
                Add to Cart
              </Button>
            )}
          {isDiscover && post?.postInfo?.postType === "service" && (
            <Button className="text-primary flex-shrink-0 whitespace-nowrap font-medium">
              Book Now
            </Button>
          )}
          {isDiscover && post?.postInfo?.postType === "product" && (
            <Button className="text-primary flex-shrink-0 whitespace-nowrap font-medium">
              Add to Cart
            </Button>
          )}
        </div>
        <div className="hide-scrollbar h-full overflow-y-scroll overflow-x-hidden">
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
                        shouldCommentBoxFocused={shouldCommentBoxFocused}
                        setShouldCommentBoxFocused={setShouldCommentBoxFocused}
                        setPostOwnerUsername={setPostOwnerUsername}
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
          shouldCommentBoxFocused={shouldCommentBoxFocused}
          setShouldCommentBoxFocused={setShouldCommentBoxFocused}
          onCommentSubmit={(v) => {
            // mutate({
            //   authorProfileId:
            // })
          }}
          postOwnerUsername={postOwnerUsername}
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
