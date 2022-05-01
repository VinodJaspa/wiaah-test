import React from "react";
import { Box, Flex, useDimensions } from "@chakra-ui/react";
import {
  ShopCardAttachment,
  ShopCardDetails,
  PostInteractions,
  CommentInput,
  CommentsViewer,
} from "ui";
import { ShopCardInfo } from "types/market/Social";
import { useLoginPopup } from "ui/Hooks";
import { ControlledCarousel } from "ui";

export interface SocialShopCardProps {
  showComments?: boolean;
  showInteraction?: boolean;
  shopCardInfo: ShopCardInfo;
  showCommentInput?: boolean;
  showbook?: boolean;
  onCardClick?: (id: string) => any;
}

export const SocialShopCard: React.FC<SocialShopCardProps> = ({
  showComments,
  showInteraction = true,
  showCommentInput = true,
  showbook,
  shopCardInfo,
  onCardClick,
}) => {
  const attachmentRef = React.useRef(null);
  const productDetailsRef = React.useRef(null);

  const productDetailsDimensions = useDimensions(productDetailsRef);
  const [active, setActive] = React.useState<number>(0);
  const { OpenLoginPopup } = useLoginPopup();
  function handleAddToCart() {
    OpenLoginPopup();
  }
  return (
    <Flex
      onClick={() => onCardClick && onCardClick(shopCardInfo.id)}
      rounded="lg"
      w="100%"
      h="100%"
      data-testid="ShopCardContainer"
      direction={"column"}
    >
      {shopCardInfo.attachments && shopCardInfo.attachments.length > 1 ? (
        <ControlledCarousel
          arrows={shopCardInfo.attachments.length > 1}
          // gap={32}
          onCurrentActiveChange={setActive}
          h={
            productDetailsDimensions
              ? `calc(100% - ${productDetailsDimensions.borderBox.height}px)`
              : "100%"
          }
        >
          {shopCardInfo.attachments.map((attachment, i) => (
            <ShopCardAttachment
              key={i}
              showbook={showbook}
              onInteraction={OpenLoginPopup}
              productType={shopCardInfo.type}
              cashback={shopCardInfo.cashback}
              discount={shopCardInfo.discount}
              innerProps={{
                // ["data-testid"]: "test attachment",
                ref: attachmentRef,
              }}
              {...attachment}
            />
          ))}
        </ControlledCarousel>
      ) : (
        shopCardInfo.attachments &&
        shopCardInfo.attachments.length === 1 && (
          <ShopCardAttachment
            showbook={showbook}
            onInteraction={OpenLoginPopup}
            productType={shopCardInfo.type}
            cashback={shopCardInfo.cashback}
            discount={shopCardInfo.discount}
            {...shopCardInfo.attachments[0]}
          />
        )
      )}
      <Box
        // w={
        //   attachmentDimensions
        //     ? `${attachmentDimensions.contentBox.width}px`
        //     : "100%"
        // }
        w="100%"
        ref={productDetailsRef}
        alignSelf={"center"}
      >
        <ShopCardDetails
          data-testid="ShopCardDetails"
          onAddToCart={handleAddToCart}
          service={shopCardInfo.type === "service"}
          {...shopCardInfo}
        />
        {showInteraction && (
          <PostInteractions
            comments={shopCardInfo.noOfComments}
            likes={shopCardInfo.likes}
          />
        )}
        {showCommentInput && <CommentInput />}
      </Box>
      {showComments && (
        <Box py="0.5rem">
          <CommentsViewer
            comments={shopCardInfo.comments}
            maxInitailComments={4}
          />
        </Box>
      )}
    </Flex>
  );
};
