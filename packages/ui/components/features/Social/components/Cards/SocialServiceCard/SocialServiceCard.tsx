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

export interface SocialServicePostCardProps extends ServicePostType {
  onServiceClick?: (id: string) => any;
}

export const SocialServicePostCard: React.FC<SocialServicePostCardProps> = (
  props
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
        attachments={props.attachements}
        {...props}
      />
      <PostInteractions {...postInteraction} />
      <CommentInput />
      <PostCommentsList postId={id} />
    </div>
  );
};
