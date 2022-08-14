import React from "react";
import { ShopCardInfo } from "types";
import {
  useProductViewModal,
  useHandlePostSharing,
  useLoginPopup,
  ShopCardAttachment,
  SocialServicePostAttachments,
  PostInteractionsProps,
  SocialServiceCardDetails,
  CommentsViewer,
  CommentInput,
  ControlledCarousel,
  PostInteractions,
} from "ui";

export interface SocialServiceDetailsCardProps {
  showComments?: boolean;
  showInteraction?: boolean;
  shopCardInfo: ShopCardInfo;
  showCommentInput?: boolean;
  showbook?: boolean;
  onCardClick?: (id: string) => any;
  interactionsProps?: Partial<PostInteractionsProps>;
}

export const SocialServiceDetailsCard: React.FC<
  SocialServiceDetailsCardProps
> = ({
  shopCardInfo,
  interactionsProps,
  onCardClick,
  showCommentInput,
  showComments,
  showInteraction,
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
      className="flex w-full h-full flex-col justify-between rounded-lg"
      onClick={() => onCardClick && onCardClick(shopCardInfo.id)}
      data-testid="ShopCardContainer"
    >
      <div></div>
      {shopCardInfo.attachments && shopCardInfo.attachments.length > 1 ? (
        <ControlledCarousel onCurrentActiveChange={setActive}>
          {shopCardInfo.attachments.map((attachment, i) => (
            <SocialServicePostAttachments
              key={i}
              onInteraction={OpenLoginPopup}
              productType={shopCardInfo.type}
              cashback={shopCardInfo.cashback}
              discount={shopCardInfo.discount}
              innerProps={{
                // ["data-testid"]: "test attachment",
                // @ts-ignore
                ref: attachmentRef,
              }}
              {...attachment}
            />
          ))}
        </ControlledCarousel>
      ) : (
        shopCardInfo.attachments &&
        shopCardInfo.attachments.length === 1 && (
          <SocialServicePostAttachments
            onInteraction={OpenLoginPopup}
            productType={shopCardInfo.type}
            cashback={shopCardInfo.cashback}
            discount={shopCardInfo.discount}
            {...shopCardInfo.attachments[0]}
          />
        )
      )}
      <div
        className="bg-white w-full text-black self-center"
        ref={productDetailsRef}
      >
        <SocialServiceCardDetails
          views={shopCardInfo.views || 0}
          data-testid="ShopCardDetails"
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
      </div>
      {showComments && (
        <div className="py-2">
          <CommentsViewer
            comments={shopCardInfo.comments}
            maxInitailComments={4}
          />
        </div>
      )}
    </div>
  );
};
