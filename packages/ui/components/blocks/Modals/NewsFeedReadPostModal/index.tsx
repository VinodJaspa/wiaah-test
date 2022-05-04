import {
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import React from "react";
import {
  useNewsFeedPostPopup,
  newsfeedPosts,
  PostCard,
  PostsViewModalsHeader,
  useLoginPopup,
  useUserData,
} from "ui";

export interface NewsfeedPostDetailsPopupProps {}

export const NewsfeedPostDetailsPopup: React.FC<NewsfeedPostDetailsPopupProps> =
  () => {
    const { postId, removeCurrentPost } = useNewsFeedPostPopup();
    const { OpenLoginPopup } = useLoginPopup();
    const { user } = useUserData();
    const {
      data: postDetails,
      isLoading,
      isError,
      error,
    } = useQuery(
      ["newsFeedPostDetails", { id: postId }],
      async ({ queryKey }: any) => {
        const id = queryKey[1].id;
        if (!id) throw new Error("error getting postId");
        const post = newsfeedPosts.findIndex((post) => post.postInfo.id === id);
        if (post < 0) throw new Error("post not found");

        return newsfeedPosts[post];
      },
      {
        enabled: !!postId,
      }
    );

    if (!postId) return null;
    if (!user) {
      removeCurrentPost();
      OpenLoginPopup();
      return null;
    }

    return (
      <Modal
        autoFocus={false}
        isCentered
        isOpen={!!postId}
        onClose={removeCurrentPost}
      >
        <ModalOverlay />

        <ModalContent
          p="0px"
          rounded="none"
          maxW={"min(100%,35rem)"}
          h={{ base: "100%", sm: "90%" }}
        >
          <ModalHeader py="0.5rem" px="0px">
            <PostsViewModalsHeader onBackClick={removeCurrentPost} />
          </ModalHeader>
          <ModalBody px="0.25rem" overflow={"scroll"} h="100%">
            {isError && <Text>something went wrong :{error}</Text>}
            {postDetails && (
              <PostCard
                innerProps={{ h: "100%", overflowY: "scroll" }}
                // showComments
                {...postDetails}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
