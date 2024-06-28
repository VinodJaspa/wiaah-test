import { ServicePostType } from "api";
import React from "react";
import {
  PostInteractions,
  PostCommentsList,
  CommentInput,
  HashTags,
  PostHead,
  EllipsisText,
  SocialServicePostMetaDataCard,
} from "@UI";
import { TypeOfService } from "@features/API";

export interface SocialServicePostCardProps extends ServicePostType {
  onServiceClick?: (id: string) => any;
  type: TypeOfService;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  service: {
    id: string;
    thumbnail: string;
    price: number;
    rating: number;
    title: string;
  };
  postInteraction: {
    shares: number;
    views: number;
    comments: number;
    likes: number;
  };
}

export const SocialServicePostCard: React.FC<SocialServicePostCardProps> = (
  props,
) => {
  const {
    id,
    postInteraction,
    user,
    hashtags,
    content,
    createdAt,
    onServiceClick,
  } = props;
  function handleServiceClick() {
    if (onServiceClick) {
      onServiceClick(id);
    }
  }
  return (
    <div className="w-full flex flex-col gap-2 cursor-pointer">
      {user && (
        <PostHead
          createdAt={createdAt}
          creatorName={user.name}
          creatorPhoto={user.thumbnail}
        />
      )}
      {content && <EllipsisText wordBreak content={content} maxLines={3} />}
      <HashTags tags={hashtags || []} />
      <SocialServicePostMetaDataCard
        onClick={() => handleServiceClick()}
        post={{
          id: props.id,
          userId: props.user.id,
          comments: props.postInteraction.comments,
          reactionNum: props.postInteraction.likes,
          shares: props.postInteraction.shares,
          views: props.postInteraction.views,
          createdAt: props.createdAt,
          serviceId: props.id,
          serviceType: props.type,
          location: props.location,
          service: props.service,
          user: props.user,
        }}
        {...props}
      />
      <PostInteractions {...postInteraction} />
      <CommentInput />
      <PostCommentsList postId={id} />
    </div>
  );
};
