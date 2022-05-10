import React from "react";
import { Box, Flex, useDimensions } from "@chakra-ui/react";
import {
  ShopCardAttachment,
  ShopCardDetails,
  PostInteractions,
  CommentInput,
  CommentsViewer,
  useProductViewModal,
  useHandlePostSharing,
} from "ui";
import { ShopCardInfo } from "types/market/Social";
import { useLoginPopup } from "ui/Hooks";
import { ControlledCarousel } from "ui";
import { PostInteractionsProps } from "../PostInteractions";

export interface SocialShopCardProps {
  showComments?: boolean;
  showInteraction?: boolean;
  shopCardInfo: ShopCardInfo;
  showCommentInput?: boolean;
  showbook?: boolean;
  onCardClick?: (id: string) => any;
  interactionsProps?: Partial<PostInteractionsProps>;
}

export const SocialShopCard: React.FC<SocialShopCardProps> = ({
  showComments,
  showInteraction = true,
  showCommentInput = true,
  showbook,
  shopCardInfo,
  onCardClick,
  interactionsProps,
}) => {
  const attachmentRef = React.useRef(null);
  const productDetailsRef = React.useRef(null);
  const { showProduct } = useProductViewModal();

  const { handleShare } = useHandlePostSharing();
  const [active, setActive] = React.useState<number>(0);
  const { OpenLoginPopup } = useLoginPopup();
  function handleAddToCart(productId: string) {
    showProduct({
      productType: "product",
      productId,
    });
  }
  function handleBookService(serviceId: string) {
    showProduct({
      productType: "service",
      productId: serviceId,
    });
  }

  return (
    <Flex
      onClick={() => onCardClick && onCardClick(shopCardInfo.id)}
      rounded="lg"
      w="100%"
      h="100%"
      data-testid="ShopCardContainer"
      direction={"column"}
      justify="space-between"
    >
      <Box></Box>
      {shopCardInfo.attachments && shopCardInfo.attachments.length > 1 ? (
        <ControlledCarousel onCurrentActiveChange={setActive}>
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
        bgColor={"white"}
        w="100%"
        color="black"
        ref={productDetailsRef}
        alignSelf={"center"}
      >
        <ShopCardDetails
          onBook={() => handleBookService(shopCardInfo.id)}
          views={shopCardInfo.views || 0}
          data-testid="ShopCardDetails"
          onAddToCart={() => handleAddToCart(shopCardInfo.id)}
          service={shopCardInfo.type === "service"}
          {...shopCardInfo}
        />
        {showInteraction && (
          <PostInteractions
            comments={shopCardInfo.noOfComments}
            onShare={(mothed) => handleShare(mothed, shopCardInfo.id)}
            likes={shopCardInfo.likes}
            {...interactionsProps}
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
