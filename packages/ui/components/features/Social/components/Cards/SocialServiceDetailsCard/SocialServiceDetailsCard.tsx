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
> = (props) => {
  const {
    interactionsProps,
    onCardClick,
    showCommentInput,
    showInteraction,
    attachements,
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

  const { emit: handleShare } = useReactPubsub(
    (keys) => keys.sharePostWithModal
  );
  const { emit: OpenLoginPopup } = useReactPubsub(
    (keys) => keys.openLoginPopup
  );

  return (
    <div
      className="flex w-full h-full flex-col justify-between rounded-lg"
      data-testid="ShopCardContainer"
    >
      <AspectRatio onClick={() => onCardClick && onCardClick(id)} ratio={4 / 3}>
        {attachements && attachements.length > 1 ? (
          <Slider>
            {attachements.map((attachement, i) => (
              <SocialServicePostAttachment
                id={id}
                alt={name}
                key={i}
                onInteraction={(interaction) => OpenLoginPopup}
                cashback={cashback}
                discount={discount}
                {...attachement}
              />
            ))}
          </Slider>
        ) : (
          attachements &&
          attachements.length === 1 && (
            <SocialServicePostAttachment
              id={id}
              alt={name}
              onInteraction={(interaction) => OpenLoginPopup()}
              cashback={cashback}
              discount={discount}
              {...attachements[0]}
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
            {...interactionsProps}
          />
        )}
        {showCommentInput && <CommentInput />}
      </div>
    </div>
  );
};
