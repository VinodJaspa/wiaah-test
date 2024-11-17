import React from "react";
import {
  ShopCardAttachment,
  ShopCardDetails,
  PostInteractions,
  CommentInput,
  CommentsViewer,
  useProductViewModal,
  useHandlePostSharing,
} from "ui";
import { ShopCardInfo } from "types";
import { useLoginPopup } from "ui";
import { ControlledCarousel } from "ui";
import { PostInteractionsProps } from "../PostInteractions";
import { AttachmentType, ContentHostType } from "@features/API";

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
    <div
      className="flex w-full md:h-[200px] h-full flex-col justify-between rounded-lg "
      onClick={() => onCardClick && onCardClick(shopCardInfo.id)}
      data-testid="ShopCardContainer"
    >
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
              src={attachment.src}
              innerProps={{
                // ["data-testid"]: "test attachment",
                ref: attachmentRef,
              }}
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
            src={shopCardInfo.attachments[0].src}
          />
        )
      )}
      <div
        className="bg-white w-full text-black self-center z-[65]"
        ref={productDetailsRef}
      >
        <ShopCardDetails
          onBook={() => handleBookService(shopCardInfo.id)}
          views={shopCardInfo.views || 0}
          data-testid="ShopCardDetails"
          onAddToCart={() => handleAddToCart(shopCardInfo.id)}
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
        {showCommentInput && (
          <CommentInput
            className="bg-black text-white rouneded-full"
            inputClassName="bg-black placeholder-white border-2 border-white"
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
                  type: AttachmentType.Img, // or "video", "audio", etc.
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
