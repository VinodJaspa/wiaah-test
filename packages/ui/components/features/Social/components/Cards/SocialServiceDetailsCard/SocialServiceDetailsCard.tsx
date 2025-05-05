import { ServicePostDetails } from "api";
import React from "react";
import { useReactPubsub } from "react-pubsub";
import {
  SocialServicePostAttachment,
  PostInteractionsProps,
  SocialServiceCardDetails,
  CommentInput,
  PostInteractions,
  Slider,
  AspectRatio,
} from "@UI";
import { useTypedReactPubsub } from "../../../../../../libs/TypedReactPubsub";
import { ServicePresentation } from "@features/API";

export interface SocialServiceDetailsCardProps extends ServicePostDetails {
  showComments?: boolean;
  showInteraction?: boolean;
  showCommentInput?: boolean;
  onCardClick?: (id: string) => any;
  interactionsProps?: Partial<PostInteractionsProps>;
  attachments: ServicePresentation[];
}

export const SocialServiceDetailsCard: React.FC<
  SocialServiceDetailsCardProps
> = (props) => {
  const {
    interactionsProps,
    onCardClick,
    showCommentInput,
    showInteraction,
    attachments,
    id,
    name,
    postInteraction,
    profileInfo,
    cashback,
    discount,
    price,
    rate,
    views,
  } = props;
  const productDetailsRef = React.useRef(null);

  const { emit: handleShare } = useTypedReactPubsub(
    (keys) => keys.sharePostWithModal,
  );
  const { emit: OpenLoginPopup } = useTypedReactPubsub(
    (keys) => keys.openLoginPopup,
  );

  return (
    <div
      className="flex w-full h-full flex-col justify-between rounded-lg"
      data-testid="ShopCardContainer"
    >
      <AspectRatio onClick={() => onCardClick && onCardClick(id)} ratio={4 / 3}>
        {attachments && attachments.length > 1 ? (
          <Slider>
            {attachments.map((attachment, i) => (
              <SocialServicePostAttachment
                id={id}
                alt={name}
                key={i}
                onInteraction={(interaction) => OpenLoginPopup}
                cashback={cashback}
                discount={discount}
                attachment={attachment}
              />
            ))}
          </Slider>
        ) : (
          attachments &&
          attachments.length === 1 && (
            <SocialServicePostAttachment
              id={id}
              alt={name}
              onInteraction={(interaction) => OpenLoginPopup()}
              cashback={cashback}
              discount={discount}
              attachment={attachments[0]}
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
          price={price}
          rating={rate}
          title={name}
          user={profileInfo}
        />
        {showInteraction && (
          <PostInteractions
            comments={postInteraction.comments}
            onShare={(method) => handleShare({ method, id })}
            likes={postInteraction.likes}
            shares={0}
            {...interactionsProps}
          />
        )}
        {showCommentInput && <CommentInput />}
      </div>
    </div>
  );
};
