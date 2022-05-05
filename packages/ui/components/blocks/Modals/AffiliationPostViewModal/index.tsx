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
  useAffiliationPostViewPopup,
  PostCard,
  PostsViewModalsHeader,
  useLoginPopup,
  useUserData,
} from "ui";
import {
  SocialAffiliationCard,
  useGetAffiliationPost,
  usePostsCommentsDrawer,
} from "ui";

export interface AffiliationPostViewModalProps {}

export const AffiliationPostViewModal: React.FC<AffiliationPostViewModalProps> =
  () => {
    const { postId, removeCurrentPost } = useAffiliationPostViewPopup();
    const { OpenLoginPopup } = useLoginPopup();
    const { user } = useUserData();
    const { setCommentsPostId } = usePostsCommentsDrawer();
    const {
      data: postDetails,
      isError,
      error,
    } = useGetAffiliationPost(postId || null);

    if (!postId) return null;
    if (!user) {
      removeCurrentPost();
      OpenLoginPopup();
      return null;
    }

    function handleInteraction(interaction: Interaction) {
      console.log("test");
      if (!postId) return;
      switch (interaction.type) {
        case "comment":
          setCommentsPostId(postId);
          break;

        default:
          break;
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
            {isError && <Text>something went wrong :{error}</Text>}
            {postDetails && (
              <SocialAffiliationCard
                innerProps={{ h: "100%", justify: "space-between" }}
                interactionsProps={{
                  onInteraction: handleInteraction,
                }}
                showPostInteraction
                {...postDetails}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
