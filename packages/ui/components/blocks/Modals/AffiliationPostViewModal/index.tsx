import React from "react";
import { Interaction } from "types";
import {
  useAffiliationPostViewPopup,
  PostsViewModalsHeader,
  useLoginPopup,
  useUserData,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
} from "@UI";
import {
  SocialAffiliationCard,
  useGetAffiliationPost,
  usePostsCommentsDrawer,
} from "@UI";

export interface AffiliationPostViewModalProps {}

export const AffiliationPostViewModal: React.FC<
  AffiliationPostViewModalProps
> = () => {
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
    <Modal isOpen={!!postId} onClose={removeCurrentPost} onOpen={() => {}}>
      <ModalOverlay />

      <ModalContent className="h-full sm:h-[90%] max-w-[min(100%,35rem)]">
        <ModalHeader title="" className="py-2 px-0">
          <PostsViewModalsHeader onBackClick={removeCurrentPost} />
        </ModalHeader>
        <div className="px-1 overflow-scroll h-full">
          {isError && <p>something went wrong :{error}</p>}
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
        </div>
      </ModalContent>
    </Modal>
  );
};
