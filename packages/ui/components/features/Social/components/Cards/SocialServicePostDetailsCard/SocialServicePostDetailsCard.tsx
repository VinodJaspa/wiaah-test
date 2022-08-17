import { ServicePostType } from "api";
import React from "react";
import {
  AspectRatioImage,
  PostInteractions,
  PostCommentsList,
  CommentInput,
  HashTags,
  EllipsisText,
} from "ui";

export interface SocialServicePostDetailsCardProps extends ServicePostType {
  onServiceClick?: (id: string) => any;
}

export const SocialServicePostDetailsCard: React.FC<
  SocialServicePostDetailsCardProps
> = ({
  id,
  label,
  name,
  postInteraction,
  thumbnail,
  hashtags,
  content,
  onServiceClick,
}) => {
  function handleServiceClick() {
    if (onServiceClick) {
      onServiceClick(id);
    }
  }
  return (
    <div className="w-full flex flex-col gap-2 cursor-pointer">
      {content && <EllipsisText wordBreak content={content} maxLines={3} />}
      <HashTags tags={hashtags || []} />
      <AspectRatioImage
        onClick={() => handleServiceClick()}
        ratio={3 / 4}
        alt={name}
        src={thumbnail}
      />
      <PostInteractions {...postInteraction} />
      <CommentInput />
      <PostCommentsList postId={id} />
    </div>
  );
};
