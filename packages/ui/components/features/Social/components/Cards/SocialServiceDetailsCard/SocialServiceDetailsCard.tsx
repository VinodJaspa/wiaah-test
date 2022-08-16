import { ServicePostDetails } from "api";
import React from "react";
import {
  useProductViewModal,
  useHandlePostSharing,
  useLoginPopup,
  SocialServicePostAttachments,
  PostInteractionsProps,
  SocialServiceCardDetails,
  CommentsViewer,
  CommentInput,
  PostInteractions,
  Slider,
  AspectRatio,
} from "ui";

export interface SocialServiceDetailsCardProps extends ServicePostDetails {
  showComments?: boolean;
  showInteraction?: boolean;
  showCommentInput?: boolean;
  onCardClick?: (id: string) => any;
  interactionsProps?: Partial<PostInteractionsProps>;
}

export const SocialServiceDetailsCard: React.FC<
  SocialServiceDetailsCardProps
> = ({
  interactionsProps,
  onCardClick,
  showCommentInput,
  showComments,
  showInteraction,
  attachments,
  content,
  hashtags,
  id,
  label,
  name,
  postInteraction,
  profileInfo,
  cashback,
  discount,
  type,
  price,
  rate,
  views,
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
      onClick={() => onCardClick && onCardClick(id)}
      data-testid="ShopCardContainer"
    >
      <AspectRatio ratio={4 / 3}>
        {attachments && attachments.length > 1 ? (
          <Slider>
            {attachments.map((attachment, i) => (
              <SocialServicePostAttachments
                key={i}
                onInteraction={OpenLoginPopup}
                cashback={cashback}
                discount={discount}
                innerProps={{
                  // ["data-testid"]: "test attachment",
                  // @ts-ignore
                  ref: attachmentRef,
                }}
                {...attachment}
              />
            ))}
          </Slider>
        ) : (
          attachments &&
          attachments.length === 1 && (
            <SocialServicePostAttachments
              onInteraction={OpenLoginPopup}
              cashback={cashback}
              discount={discount}
              {...attachments[0]}
            />
          )
        )}
      </AspectRatio>
      <div
        className="bg-white w-full text-black self-center"
        ref={productDetailsRef}
      >
        <SocialServiceCardDetails
          views={views || 0}
          data-testid="ServiceCardDetails"
          price={price}
          rating={rate}
          title={name}
          user={profileInfo}
        />
        {showInteraction && (
          <PostInteractions
            comments={postInteraction.comments}
            onShare={(mothed) => handleShare(mothed, id)}
            likes={postInteraction.likes}
            {...interactionsProps}
          />
        )}
        {showCommentInput && <CommentInput />}
      </div>
    </div>
  );
};
