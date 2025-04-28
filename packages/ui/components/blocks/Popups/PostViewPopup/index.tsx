import { AttachmentType, ContentHostType } from "@features/API";
import { useActionComments } from "@src/Hooks";
import {
  Modal,
  ModalContent,
  ModalOverlay,
  PostCommentCardProps,
  PostView,
} from "@UI";
import { getRandomImage } from "placeholder";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdClose, MdOutlineArrowForwardIos } from "react-icons/md";
import { useRouting } from "routing";

export interface PostViewPopupProps<TData> {
  renderChild: (props: TData) => React.ReactElement;
  idParam?: string;
  queryName: string;
  fetcher?: (queryFn: any) => Promise<TData | null>;
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  showLink?: boolean;
  data?: TData;
  posts?: TData[];
  fromAffiliation?: boolean;
  isHome?: boolean;
  isDiscover?: boolean;
}

export function PostViewPopup<TData extends {}>({
  renderChild,
  idParam = "postId",
  queryName = "post",
  fetcher,
  isOpen,
  handleOpen,
  handleClose,
  showLink = false,
  data,
  posts = [],
  fromAffiliation,
  isHome,
  isDiscover,
}: PostViewPopupProps<TData>) {
  const { visit, getCurrentPath } = useRouting();
  const { OpenComments } = useActionComments();
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  const [currentPost, setCurrentPost] = useState<any | undefined>(data);

  React.useEffect(() => {
    setCurrentPost(data ? { ...data } : undefined);
  }, [data]);

  React.useEffect(() => {
    OpenComments();
  }, []);

  const currentPostIndex = posts.findIndex(
    (post: any) => post?.postInfo?.id === currentPost?.postInfo?.id,
  );

  const handleShowPreviousPost = () => {
    if (currentPostIndex > 0) {
      setCurrentPost(posts[currentPostIndex - 1]);
    }
  };

  const handleShowNextPost = () => {
    if (currentPostIndex >= 0 && currentPostIndex < posts.length - 1) {
      setCurrentPost(posts[currentPostIndex + 1]);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [isOpen]);

  return (
    <>
      <Modal onOpen={() => {}} onClose={handleClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent className="w-3/5 h-4/5 p-0">
          <div className="w-full h-full">
            <MdClose
              onClick={handleClose}
              className="absolute -top-2 -left-16 text-3xl w-9 h-9 cursor-pointer text-white"
              aria-label="Close Post"
            />
            <PostView
              isDiscover={isDiscover}
              isHome={isHome}
              fromAffiliation={fromAffiliation}
              key={currentPost?.postInfo?.id}
              postId={currentPost?.postInfo?.id}
              queryName="newFeedPost"
              data={currentPost}
              idParam="newsfeedpostid"
              renderChild={renderChild}
            />
            {currentPostIndex > 0 && (
              <div
                onClick={handleShowPreviousPost}
                className="absolute top-0 -right-[68px] z-50 cursor-pointer select-none rounded-full p-3 bg-white text-white"
              >
                <MdOutlineArrowForwardIos className="-rotate-90 text-[#20ECA7] w-[22px] h-[22px]" />
              </div>
            )}
            {currentPostIndex < posts.length - 1 && (
              <div
                onClick={handleShowNextPost}
                className="absolute bottom-0 -right-[68px] z-50 cursor-pointer select-none rounded-full p-3 bg-white text-white"
              >
                <MdOutlineArrowForwardIos className="rotate-90 text-[#20ECA7] w-[22px] h-[22px]" />
              </div>
            )}
          </div>
        </ModalContent>
      </Modal>
    </>
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
