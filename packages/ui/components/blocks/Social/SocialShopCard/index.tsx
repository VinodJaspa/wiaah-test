import React, { useState, useRef } from "react";
import {
  ShopCardAttachment,
  ShopCardDetails,
  PostInteractions,
  CommentInput,
  CommentsViewer,
  useProductViewModal,
  useHandlePostSharing,
  ControlledCarousel,
  useLoginPopup,
} from "ui";
import { ShopCardInfo } from "types";
import { PostInteractionsProps } from "../PostInteractions";
import { AttachmentType, ContentHostType } from "@features/API";

export interface SocialShopCardProps {
  showComments?: boolean;
  showInteraction?: boolean;
  shopCardInfo: ShopCardInfo;
  showCommentInput?: boolean;
  showbook?: boolean;
  onCardClick?: (id: string) => void;
  interactionsProps?: Partial<PostInteractionsProps>;
}

const ShopCardAttachments: React.FC<{
  attachments: ShopCardInfo["attachments"];
  shopCardInfo: ShopCardInfo;
  showbook?: boolean;
  onInteraction: () => void;
  onActiveChange?: (index: number) => void;
}> = ({
  attachments,
  shopCardInfo,
  showbook,
  onInteraction,
  onActiveChange,
}) => {
    if (!attachments || attachments.length === 0) return null;

    return attachments.length > 1 ? (
      <ControlledCarousel onCurrentActiveChange={onActiveChange}>
        {attachments.map((attachment, index) => (
          <ShopCardAttachment
            key={index}
            showbook={showbook}
            onInteraction={onInteraction}
            productType={shopCardInfo.type}
            cashback={shopCardInfo.cashback}
            discount={shopCardInfo.discount}
            src={attachment.src}
          />
        ))}
      </ControlledCarousel>
    ) : (
      <ShopCardAttachment
        showbook={showbook}
        onInteraction={onInteraction}
        productType={shopCardInfo.type}
        cashback={shopCardInfo.cashback}
        discount={shopCardInfo.discount}
        src={attachments[0].src}
      />
    );
  };

export const SocialShopCard: React.FC<SocialShopCardProps> = ({
  showComments,
  showInteraction = true,
  showCommentInput = true,
  showbook,
  shopCardInfo,
  onCardClick,
  interactionsProps,
}) => {
  const attachmentRef = useRef(null);
  const productDetailsRef = useRef(null);
  const { showProduct } = useProductViewModal();
  const { handleShare } = useHandlePostSharing();
  const { OpenLoginPopup } = useLoginPopup();
  const [active, setActive] = useState<number>(0);

  const handleAddToCart = () =>
    showProduct({ productType: "product", productId: shopCardInfo.id });

  const handleBookService = () =>
    showProduct({ productType: "service", productId: shopCardInfo.id });

  return (
    <div
      className="flex w-full md:h-[200px] h-full flex-col justify-between rounded-lg"
      onClick={() => onCardClick?.(shopCardInfo.id)}
    >
      <ShopCardAttachments
        attachments={shopCardInfo.attachments}
        shopCardInfo={shopCardInfo}
        showbook={showbook}
        onInteraction={OpenLoginPopup}
        onActiveChange={setActive}
      />

      <div
        className="bg-white w-full text-black self-center"
        ref={productDetailsRef}
      >
        <ShopCardDetails
          onBook={handleBookService}
          onAddToCart={handleAddToCart}
          views={shopCardInfo.views || 0}
          data-testid="ShopCardDetails"
          {...shopCardInfo}
        />

        {showInteraction && (
          <PostInteractions
            className="bg-black text-white"
            comments={shopCardInfo.noOfComments}
            onShare={(method) => handleShare(method, shopCardInfo.id)}
            likes={shopCardInfo.likes}
            {...interactionsProps}
          />
        )}

        {showCommentInput && (
          <CommentInput
            className="bg-black text-white rounded-full border-0"
            inputClassName="bg-black placeholder-white border-2 border-white  placeholder-white"
            sendIconClassName="text-white"
          />
        )}
      </div>

      {showComments && (
        <div className="py-2">
          <CommentsViewer
            comments={[
              {
                id: "placeholder-id",
                content: "This is a placeholder comment.",
                commentedAt: new Date().toISOString(),
                likes: 0,
                userId: "placeholder-user-id",
                hostId: "placeholder-host-id",
                hostType: ContentHostType.Comment,
                updatedAt: new Date().toISOString(),
                replies: 0,
                attachment: {
                  src: "placeholder-src",
                  type: AttachmentType.Img,
                },
                author: {
                  username: "placeholder-username",
                  photo: "placeholder-photo-url",
                  verified: false,
                  id: "placeholder-author-id",
                },
              },
            ]}
            maxInitailComments={4}
          />
        </div>
      )}
    </div>
  );
};
