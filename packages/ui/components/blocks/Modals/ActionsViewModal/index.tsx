import React from "react";
import { useRouter, NextRouter } from "next/router";
import { useMutation, useQuery, QueryFunction, QueryKey } from "react-query";

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { PostAttachmentsViewer, PostCommentCard, ShadcnDialog } from "@UI";
import { useTranslation } from "react-i18next";
import { FloatingContainer, VerticalCarousel } from "@UI";
import { getParamFromAsPath } from "@UI/components/helpers";

import { PostCardPlaceHolder } from "placeholder";

export interface ActionsViewPopupProps {
  renderChild: (props: any) => React.ReactElement;
  idParam?: string;
  queryName: string;
  fetcher: (queryFn: any) => Promise<any>;
}

const goNextPost = async ({ currentId }: { currentId: string }) => {
  return { id: String(Number(currentId) + 1) };
};

const goPrevPost = async ({ currentId }: { currentId: string }) => {
  return { id: String(Number(currentId) - 1) };
};

export const ActionsViewModal: React.FC<ActionsViewPopupProps> = ({
  renderChild,
  idParam = "postId",
  queryName = "post",
  fetcher,
}) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = React.useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const router = useRouter();

  const { mutate: mutateNext } = useMutation<
    { id: string },
    unknown,
    { currentId: string }
  >(goNextPost, {
    onSuccess: (data) => {
      router.push(
        router.pathname,
        { query: { [idParam]: data.id } },
        { shallow: true }
      );
    },
  });
  const { mutate: mutatePrev } = useMutation<
    { id: string },
    unknown,
    { currentId: string }
  >(goPrevPost, {
    onSuccess: (data) => {
      router.push(
        router.pathname,
        { query: { [idParam]: data.id } },
        { shallow: true }
      );
    },
  });
  const postId = getParamFromAsPath(router.asPath, idParam);

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery([queryName, { postId }], fetcher, { enabled: !!postId });

  const reloadPath = () => {
    console.log(router);
    router.push(router.asPath.split("?")[0], undefined, { shallow: true });
  };

  React.useEffect(() => {
    if (postId && !isOpen) {
      onOpen();
    } else if (!postId && isOpen) {
      handlePostViewClose();
    }
  }, [router]);

  function handlePostViewClose() {
    onClose();
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
      <ShadcnDialog open={isOpen} onOpenChange={handlePostViewClose} className="h-screen w-full bg-transparent">
        <div className="flex flex-col h-full w-full overflow-hidden">
          <button
            onClick={handlePostViewClose}
            className="absolute top-4 right-4 p-2 text-xl bg-transparent"
            aria-label="Close Post"
          >
            <MdClose className="w-6 h-6" />
          </button>

          <VerticalCarousel
        
            data-testid="VerticalCarouselContainer"
            onPassMaxLimit={handleNextPost}
            onPassMinLimit={handlePrevPost}
          >
            {[...Array(1)].map((_, i) => (
              <div key={i} className="flex justify-center items-center w-full h-full overflow-hidden bg-black relative">
                <button
                  onClick={handleNextPost}
                  className="absolute bottom-8 right-4 p-2 text-xl bg-black/30 rounded-md"
                  aria-label="Next Post"
                >
                  <MdKeyboardArrowDown className="w-5 h-5 text-gray-500" />
                </button>
                <button
                  onClick={handlePrevPost}
                  className="absolute top-8 right-4 p-2 text-xl bg-black/30 rounded-md"
                  aria-label="Previous Post"
                >
                  <MdKeyboardArrowUp className="w-5 h-5 text-gray-500" />
                </button>

                {renderChild && post && renderChild(post)}
              </div>
            ))}
          </VerticalCarousel>

          <div className="overflow-y-scroll w-[min(100%,35rem)] bg-white flex flex-col p-2 gap-2 thinScroll">
            {PostCardPlaceHolder.postInfo.comments && (
              <>
                {PostCardPlaceHolder.postInfo.comments.length > 0 ? (
                  PostCardPlaceHolder.postInfo.comments.map((comment: any, i: any) => (
                    <PostCommentCard key={i} {...comment} />
                  ))
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <p className="capitalize font-bold text-lg">
                      {t("no_comments", "no comments in this post")}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </ShadcnDialog>

    </>
  );
};
