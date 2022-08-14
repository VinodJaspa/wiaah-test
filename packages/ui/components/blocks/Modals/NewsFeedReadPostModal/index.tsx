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

export const NewsfeedPostDetailsPopup: React.FC<
  NewsfeedPostDetailsPopupProps
> = () => {
  const { postId, removeCurrentPost } = useNewsFeedPostPopup();
  const { setCommentsPostId } = usePostsCommentsDrawer();
  // const { OpenLoginPopup } = useLoginPopup();
  const { user } = useUserData();
  const {
    data: postDetails,
    isLoading,
    isError,
    error,
  } = useGetNewsFeedPostQuery(postId || null);
  console.log("poistid", postId);

  if (!postId) return null;
  // if (!user) {
  //   removeCurrentPost();
  //   return null;
  // }

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
        <ModalHeader title="" className="">
          <PostsViewModalsHeader onBackClick={removeCurrentPost} />
        </ModalHeader>
        <div className="px-1 h-full overflow-scroll noScroll">
          {/* <SocialPostsCommentsDrawer /> */}
          {postDetails && (
            <PostCard
              onInteraction={handleInteraction}
              innerProps={{
                h: "100%",
                overflowY: "scroll",
                className: "thinScroll px-1",
              }}
              {...postDetails}
            />
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};
