import {
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
  ShopCardsInfoPlaceholder,
  useLoginPopup,
  useUserData,
  PostsViewModalsHeader,
  SocialShopCard,
  useShopPostPopup,
} from "ui";

export interface ShopPostViewModalProps {}

export const ShopPostViewModal: React.FC<ShopPostViewModalProps> = () => {
  const { postId, removeCurrentPost } = useShopPostPopup();
  const { OpenLoginPopup } = useLoginPopup();
  const { user } = useUserData();
  console.log(postId);
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
      const post = ShopCardsInfoPlaceholder.findIndex((post) => post.id === id);
      if (post < 0) throw new Error("post not found");

      return ShopCardsInfoPlaceholder[post];
    },
    {
      enabled: !!postId,
    }
  );
  console.log(postDetails);
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
      isOpen={true}
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
            <SocialShopCard
              // innerProps={{ h: "100%", overflowY: "scroll" }}
              // showComments
              shopCardInfo={postDetails}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
