import { useQuery } from "react-query";
import React from "react";
import {
  ShopCardsInfoPlaceholder,
  useLoginPopup,
  useUserData,
  PostsViewModalsHeader,
  SocialShopCard,
  useShopPostPopup,
  usePostsCommentsDrawer,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@UI";
import { Interaction } from "types";

export interface ShopPostViewModalProps { }

export const ShopPostViewModal: React.FC<ShopPostViewModalProps> = () => {
  const { postId, removeCurrentPost } = useShopPostPopup();
  const { setCommentsPostId } = usePostsCommentsDrawer();
  const { OpenLoginPopup } = useLoginPopup();
  const { user } = useUserData();
  console.log(postId);
  const {
    data: postDetails,
    isLoading,
    isError,
    error,
  } = useQuery(
    ["shopPostDetails", { id: postId }],
    async ({ queryKey }: any) => {
      const id = queryKey[1].id;
      if (!id) throw new Error("error getting postId");
      const post = ShopCardsInfoPlaceholder.findIndex((post) => post.id === id);
      if (post < 0) throw new Error("post not found");

      return ShopCardsInfoPlaceholder[post];
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
  function handleInteraction(interaction: Interaction) {
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
    <Modal onOpen={() => { }} isOpen={!!postId} onClose={removeCurrentPost}>
      <ModalOverlay />

      <ModalContent className="max-w-[min(100%,35rem)] h-full sm:h-[90%]">
        <ModalHeader title="" className="py-2 px-0">
          <PostsViewModalsHeader onBackClick={removeCurrentPost} />
        </ModalHeader>
        <div className="px-1 overflow-scroll h-full">
          {/*@ts-ignore*/}
          {isError && <p>something went wrong :{error}</p>}
          {postDetails && (
            <SocialShopCard
              interactionsProps={{
                onInteraction: handleInteraction,
              }}
              showCommentInput={false}
              shopCardInfo={postDetails}
            />
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};
