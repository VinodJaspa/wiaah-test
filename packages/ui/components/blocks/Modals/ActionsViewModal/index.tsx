import React from "react";
import { useRouter, NextRouter } from "next/router";
import { useMutation, useQuery, QueryFunction, QueryKey } from "react-query";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Box,
  Flex,
  Center,
  IconButton,
  Icon,
  Text,
  BoxProps,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { PostAttachmentsViewer, PostCommentCard } from "@UI";
import { useTranslation } from "react-i18next";
import { FloatingContainer, VerticalCarousel } from "@UI";
import { getParamFromAsPath } from "@UI/components/helpers";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
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
  const { isOpen, onClose, onOpen } = useDisclosure();
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
      <Modal
        isCentered
        onClose={handlePostViewClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        blockScrollOnMount={true}
        // css={{ "&& .chakra-modal__content-container": { overflow: "hidden" } }}
      >
        <ModalOverlay bg="black" />
        <ModalContent
          overflow={"hidden"}
          p="0px"
          bgColor={"transparent"}
          h="100vh"
          maxW={"100%"}
        >
          <ModalBody p="0px" gap="0.5rem" display="flex" h="100%" w="100%">
            <IconButton
              onClick={handlePostViewClose}
              p="0rem"
              fontSize={"xx-large"}
              colorScheme={"blackAlpha"}
              bgColor="transparent"
              aria-label="Close Post"
              icon={<Icon as={MdClose} />}
            />
            <VerticalCarousel
              w="100%"
              h="100%"
              overflow="hidden"
              data-testid="VerticalCarouselContainer"
              onPassMaxLimit={handleNextPost}
              onPassMinLimit={handlePrevPost}
            >
              {[...Array(1)].map((_, i) => (
                <FloatingContainer
                  key={i}
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
                          icon={<Icon as={ChevronDownIcon} />}
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
                          icon={<Icon as={ChevronUpIcon} />}
                        />
                      ),
                      top: "2rem",
                      right: "0rem",
                    },
                  ]}
                >
                  {renderChild && post && renderChild(post)}
                  {/* <PostAttachmentsViewer
                    attachments={post?.postInfo.attachments || []}
                    profileInfo={post?.profileInfo}
                  /> */}
                </FloatingContainer>
              ))}
            </VerticalCarousel>
            <Flex
              overflowY={"scroll"}
              className="thinScroll"
              w="min(100%,35rem)"
              bg="white"
              flexDirection={"column"}
              p="0.5rem"
              gap="0.5rem"
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
                    <Center h="100%">
                      <Text
                        textTransform={"capitalize"}
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        {t("no_comments", "no comments in this post")}
                      </Text>
                    </Center>
                  )}
                </>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
