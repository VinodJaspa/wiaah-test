import React from "react";
import { useMutation, useQuery } from "react-query";
import { MdClose } from "react-icons/md";
import {
  Modal,
  ModalContent,
  ArrowUpIcon,
  ArrowDownIcon,
  CommentInput,
  useCommentOnContent,
  PostCommentCardProps,
  Divider,
  PostView,
  Carousel,
} from "@UI";
import { useTranslation } from "react-i18next";
import { PostCommentCard, Slider } from "@UI";
import { getParamFromAsPath } from "utils";
import { getRandomImage, PostCardPlaceHolder } from "placeholder";
import { useActionComments } from "@src/Hooks";
import { useRouting } from "routing";
import { AttachmentType, ContentHostType } from "@features/API";
import { GoLink } from "react-icons/go";

import { BiBookmark } from "react-icons/bi";
import { BookingLinkBanner } from "@blocks/BookingLinkBanner";

import { MdOutlineArrowForwardIos } from "react-icons/md";

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
}

export const goNextPost = async ({ currentId }: { currentId: string }) => {
  return { id: String(Number(currentId) + 1) };
};

export const goPrevPost = async ({ currentId }: { currentId: string }) => {
  return { id: String(Number(currentId) - 1) };
};

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
}: PostViewPopupProps<TData>) {
  const { visit, getCurrentPath } = useRouting();
  const { CloseComments, OpenComments, ToggleComments, open } =
    useActionComments();
  const { t } = useTranslation();

  React.useEffect(() => {
    OpenComments();
  }, []);

  const { mutate: mutateNext } = useMutation<
    { id: string },
    unknown,
    { currentId: string }
  >(goNextPost, {
    onSuccess: (data) => {
      visit((routes) => routes.addQuery({ [idParam]: data.id }));
    },
  });
  const { mutate: mutatePrev } = useMutation<
    { id: string },
    unknown,
    { currentId: string }
  >(goPrevPost, {
    onSuccess: (data) => {
      visit((routes) => routes.addQuery({ [idParam]: data.id }));
    },
  });
  const postId = getParamFromAsPath(getCurrentPath(), idParam);
  const { mutate } = useCommentOnContent();

  // const {
  //   data: post,
  //   isLoading,
  //   isError,
  // } = useQuery([queryName, { postId }], fetcher, { enabled: !!postId });
  const post = data;

  const reloadPath = () => {
    visit((routes) => routes.addPath(""));
  };

  React.useEffect(() => {
    if (postId && !isOpen) {
      handleOpen();
    } else if (!postId && isOpen) {
      handlePostViewClose();
    }
  }, [postId]);

  function handlePostViewClose() {
    handleClose();
    reloadPath();
  }

  return (
    <>
      <Modal onOpen={() => { }} onClose={handlePostViewClose} isOpen={isOpen}>
        <ModalContent className=" h-screen w-screen bg-opacity-80 bg-black flex justify-center items-center ">
          <div className="relative w-3/5 h-4/5">
            <MdClose
              onClick={handleClose}
              className={`absolute -top-2 -right-16 text-3xl w-9 h-9 cursor-pointer text-white`}
              aria-label="Close Post"
            />
            <PostView
              postId=""
              queryName="newFeedPost"
              data={post}
              idParam="newsfeedpostid"
              renderChild={renderChild}
            />

            <div className="absolute bottom-0 -right-[68px] z-50  cursor-pointer select-none rounded-full  p-3 bg-white text-white ">
              <MdOutlineArrowForwardIos className="rotate-90 text-[#20ECA7] w-[22px] h-[22px]" />
            </div>
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
