import { PostsViewModalsHeader } from "../../../blocks/Headers";
import { PostCard } from "../../../blocks/Social";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "../../../partials";
import {
  useGetNewsFeedPostQuery,
  useNewsFeedPostPopup,
  usePostsCommentsDrawer,
  useUserData,
} from "../../../../src/Hooks";
import React from "react";
import { Interaction } from "types";

export interface NewsfeedPostDetailsPopupProps { }

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
  } = useGetNewsFeedPostQuery(postId);

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
    <Modal onOpen={() => { }} isOpen={!!postId} onClose={removeCurrentPost}>
      <ModalOverlay />

      <ModalContent className="w-[min(100%,35rem)] h-full sm:h-[90%]">
        <ModalHeader title="" className="">
          <PostsViewModalsHeader onBackClick={removeCurrentPost} />
        </ModalHeader>
        <div className="px-1 h-full overflow-scroll noScroll">
          {/* <SocialPostsCommentsDrawer /> */}
          {postDetails && <PostCard post={postDetails} />}
        </div>
      </ModalContent>
    </Modal>
  );
};
