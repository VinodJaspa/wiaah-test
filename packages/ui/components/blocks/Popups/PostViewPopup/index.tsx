import React from "react";
import { useMutation, useQuery } from "react-query";
import { MdClose } from "react-icons/md";
import { Modal, ModalContent, ArrowUpIcon, ArrowDownIcon } from "ui";
import { useTranslation } from "react-i18next";
import { PostCommentCard, Slider } from "ui";
import { getParamFromAsPath } from "utils";
import { PostCardPlaceHolder } from "placeholder";
import { useActionComments } from "@src/Hooks";
import { useRouting } from "routing";
import { useModalDisclouser } from "hooks";

export interface PostViewPopupProps<TData> {
  renderChild: (props: TData) => React.ReactElement;
  idParam?: string;
  queryName: string;
  fetcher: (queryFn: any) => Promise<TData>;
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
}: PostViewPopupProps<TData>) {
  const { visit, getCurrentPath } = useRouting();
  const { CloseComments, OpenComments, ToggleComments, open } =
    useActionComments();
  const { t } = useTranslation();
  const { isOpen, handleClose, handleOpen } = useModalDisclouser();

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

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery([queryName, { postId }], fetcher, { enabled: !!postId });

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

  function handleNextPost() {
    if (postId) {
      mutateNext({ currentId: postId });
    }
  }
  function handlePrevPost() {
    if (postId) {
      mutatePrev({ currentId: postId });
    }
  }
  return (
    <>
      <Modal onOpen={() => {}} onClose={handlePostViewClose} isOpen={isOpen}>
        {/* <ModalOverlay className="bg-opacity-[100%]" /> */}
        <ModalContent className="h-screen px-[2.5rem] bg-black flex w-screen">
          <div className="flex flex-col gap-2 w-full">
            <MdClose
              onClick={handlePostViewClose}
              className={`text-3xl w-8  cursor-pointer text-white`}
              aria-label="Close Post"
            />
            <div className="flex w-full h-full bg-black">
              <Slider
                variant="vertical"
                data-testid="VerticalCarouselContainer"
              >
                {renderChild && post && renderChild(post)}
              </Slider>
            </div>
          </div>
          <div className="flex flex-col w-10 text-white justify-between">
            <ArrowUpIcon
              onClick={handlePrevPost}
              className="text-4xl"
              aria-label="prev Post"
            />
            <ArrowDownIcon
              className="text-4xl"
              onClick={handleNextPost}
              aria-label="next Post"
            />
          </div>
          <div
            style={{
              opacity: open ? 1 : 0,
              pointerEvents: open ? "all" : "none",
              width: open ? "min(100%,35rem)" : "0px",
            }}
            className={`thinScroll transition-all transform bg-white flex-col p-2 gap-2 flex overflow-x-scroll`}
          >
            {PostCardPlaceHolder.postInfo.comments && (
              <>
                {PostCardPlaceHolder.postInfo.comments.length > 0 ? (
                  PostCardPlaceHolder.postInfo.comments.map(
                    (comment: any, i: any) => (
                      <PostCommentCard key={i} {...comment} />
                    )
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
        </ModalContent>
      </Modal>
    </>
  );
}
