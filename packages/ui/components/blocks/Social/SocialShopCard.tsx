import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { ShopCardAttachment } from "./ShopCardAttachment";
import { ShopCardDetails } from "./ShopCardDetails";
import { PostInteractions } from "./PostInteractions";
import { CommentInput } from "./CommentInput";
import { CommentsViewer } from "./CommentsViewer";
import { ShopCardInfo } from "types/market/Social";
import { useLoginPopup } from "../../../Hooks";
export interface SocialShopCardProps {
  showComments?: boolean;
  shopCardInfo: ShopCardInfo;
  showbook?: boolean;
}

export const SocialShopCard: React.FC<SocialShopCardProps> = ({
  showComments,
  showbook,
  shopCardInfo,
}) => {
  const { OpenLoginPopup } = useLoginPopup();
  function handleAddToCart() {
    OpenLoginPopup();
  }
  return (
    <Flex
      bg="white"
      p="1rem"
      boxShadow={"main"}
      rounded="lg"
      w="100%"
      direction={"column"}
    >
      <ShopCardAttachment
        showbook={showbook}
        onInteraction={OpenLoginPopup}
        productType={shopCardInfo.type}
        cashback={shopCardInfo.cashback}
        discount={shopCardInfo.discount}
        {...shopCardInfo.attachment}
      />
      <ShopCardDetails
        onAddToCart={handleAddToCart}
        service={shopCardInfo.type === "service"}
        {...shopCardInfo}
      />
      <PostInteractions
        comments={shopCardInfo.noOfComments}
        likes={shopCardInfo.likes}
      />
      <CommentInput />
      <Box py="0.5rem">
        {showComments && (
          <CommentsViewer
            comments={shopCardInfo.comments}
            maxInitailComments={4}
          />
        )}
      </Box>
    </Flex>
  );
};
