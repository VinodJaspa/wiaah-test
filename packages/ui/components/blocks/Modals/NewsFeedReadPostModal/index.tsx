import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Interaction } from "types";
import {
  useNewsFeedPostPopup,
  PostCard,
  PostsViewModalsHeader,
  useLoginPopup,
  useUserData,
  useGetNewsFeedPostQuery,
  usePostsCommentsDrawer,
  SocialPostsCommentsDrawer,
} from "ui";

export interface NewsfeedPostDetailsPopupProps {}

export const NewsfeedPostDetailsPopup: React.FC<NewsfeedPostDetailsPopupProps> =
  () => {
    const { postId, removeCurrentPost } = useNewsFeedPostPopup();
    const { setCommentsPostId } = usePostsCommentsDrawer();
    const { OpenLoginPopup } = useLoginPopup();
    const { user } = useUserData();
    const {
      data: postDetails,
      isLoading,
      isError,
      error,
    } = useGetNewsFeedPostQuery(postId || null);

    if (!postId) return null;
    if (!user) {
      removeCurrentPost();
      OpenLoginPopup();
      return null;
    }

    function handleInteraction(interaction: Interaction) {
      if (!postId) return;
      switch (interaction.type) {
        case "comment":
          setCommentsPostId(postId);
          console.log("test");
          break;

        default:
          return;
      }
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
            <SocialPostsCommentsDrawer />
            {isError && <Text>something went wrong :{error}</Text>}
            {postDetails && (
              <PostCard
                onInteraction={handleInteraction}
                innerProps={{ h: "100%", overflowY: "scroll" }}
                {...postDetails}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
