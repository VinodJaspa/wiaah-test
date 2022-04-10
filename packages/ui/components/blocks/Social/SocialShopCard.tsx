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
}

export const SocialShopCard: React.FC<SocialShopCardProps> = ({
  showComments,
  shopCardInfo,
}) => {
  const { OpenLoginPopup } = useLoginPopup();
  return (
    <Flex
      bg="white"
      p="1rem"
      style={{ boxShadow: "0px 3px 15px -5px gray" }}
      rounded="lg"
      w="100%"
      direction={"column"}
    >
      <ShopCardAttachment
        onInteraction={OpenLoginPopup}
        productType={shopCardInfo.type}
        cashback={shopCardInfo.cashback}
        discount={shopCardInfo.discount}
        {...shopCardInfo.attachment}
      />
      <ShopCardDetails {...shopCardInfo} />
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
