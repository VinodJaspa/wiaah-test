import React from "react";
import { useMutation, useQuery } from "react-query";
import { useDisclosure, IconButton, Icon, Text } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ArrowUpIcon,
  ArrowDownIcon,
} from "ui";
import { useTranslation } from "react-i18next";
import { FloatingContainer, VerticalCarousel, PostCommentCard } from "ui";
import { getParamFromAsPath } from "utils";
import { PostCardPlaceHolder } from "placeholder";
import { useActionComments } from "ui/Hooks";
import { useRouting } from "routing";

export interface PostViewPopupProps {
  renderChild: (props: any) => React.ReactElement;
  idParam?: string;
  queryName: string;
  fetcher: (queryFn: any) => Promise<any>;
}

export const goNextPost = async ({ currentId }: { currentId: string }) => {
  return { id: String(Number(currentId) + 1) };
};

export const goPrevPost = async ({ currentId }: { currentId: string }) => {
  return { id: String(Number(currentId) - 1) };
};

export const PostViewPopup: React.FC<PostViewPopupProps> = ({
  renderChild,
  idParam = "postId",
  queryName = "post",
  fetcher,
}) => {
  const { visit, getCurrentPath } = useRouting();
  const { CloseComments, OpenComments, ToggleComments, open } =
    useActionComments();
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { mutate: mutateNext } = useMutation<
    { id: string },
    unknown,
    { currentId: string }
  >(goNextPost, {
    onSuccess: (data) => {
      visit((routes) => routes.addQuery({ [idParam]: data.id }));
      OpenComments();
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
      onOpen();
    } else if (!postId && isOpen) {
      handlePostViewClose();
    }
  }, []);

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
      <Modal onOpen={() => {}} onClose={handlePostViewClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent className="h-screen flex w-screen">
          <IconButton
            onClick={handlePostViewClose}
            p="0rem"
            fontSize={"xx-large"}
            colorScheme={"blackAlpha"}
            bgColor="transparent"
            aria-label="Close Post"
            icon={<Icon as={MdClose} />}
          />
          <FloatingContainer
            // key={i}
            className="flex justify-center items-center w-full h-full overflow-hidden bg-black"
            items={[
              {
                label: (
                  <IconButton
                    onClick={handleNextPost}
                    p="0rem"
                    fontSize={"xxx-large"}
                    colorScheme={"blackAlpha"}
                    bgColor="blackAlpha.300"
                    aria-label="Close Post"
                    icon={<Icon as={ArrowDownIcon} />}
                  />
                ),
                bottom: "2rem",
                right: "0rem",
              },
              {
                label: (
                  <IconButton
                    onClick={handlePrevPost}
                    p="0rem"
                    fontSize={"xxx-large"}
                    colorScheme={"blackAlpha"}
                    bgColor="blackAlpha.300"
                    aria-label="Close Post"
                    icon={<Icon as={ArrowUpIcon} />}
                  />
                ),
                top: "2rem",
                right: "0rem",
              },
            ]}
          >
            <VerticalCarousel
              w="100%"
              h="100%"
              overflow="hidden"
              data-testid="VerticalCarouselContainer"
              onPassMaxLimit={handleNextPost}
              onPassMinLimit={handlePrevPost}
            >
              {[...Array(1)].map(
                (_, i) => renderChild && post && renderChild(post)
              )}
              {/* {renderChild && post && renderChild(post)} */}
            </VerticalCarousel>
          </FloatingContainer>
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
                    <Text
                      textTransform={"capitalize"}
                      fontWeight="bold"
                      fontSize="lg"
                    >
                      {t("no comments in this post")}
                    </Text>
                  </div>
                )}
              </>
            )}
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};
