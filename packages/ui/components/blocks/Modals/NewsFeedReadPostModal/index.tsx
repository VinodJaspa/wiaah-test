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
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
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
          break;

        default:
          return;
      }
    }

    return (
      <Modal onOpen={() => {}} isOpen={!!postId} onClose={removeCurrentPost}>
        <ModalOverlay />

        <ModalContent className="w-[min(100%,35rem)] h-full sm:h-[90%]">
          <ModalHeader title="" className="py-2 px-0">
            <PostsViewModalsHeader onBackClick={removeCurrentPost} />
          </ModalHeader>
          <div className="px-1 h-full overflow-scroll">
            <SocialPostsCommentsDrawer />
            {isError && <p>something went wrong :{error}</p>}
            {postDetails && (
              <PostCard
                onInteraction={handleInteraction}
                innerProps={{ h: "100%", overflowY: "scroll" }}
                {...postDetails}
              />
            )}
          </div>
        </ModalContent>
      </Modal>
    );
  };
