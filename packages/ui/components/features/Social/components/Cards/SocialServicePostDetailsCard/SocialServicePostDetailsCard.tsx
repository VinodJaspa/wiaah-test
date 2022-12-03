import { ServicePostType } from "api";
import React from "react";
import {
  AspectRatio,
  PostInteractions,
  PostCommentsList,
  CommentInput,
  HashTags,
  EllipsisText,
  SocialServicePostAttachment,
  Slider,
} from "ui";

export interface SocialServicePostDetailsCardProps extends ServicePostType {
  onServiceClick?: (id: string) => any;
}

export const SocialServicePostDetailsCard: React.FC<
  SocialServicePostDetailsCardProps
> = (props) => {
  const {
    id,
    label,
    name,
    postInteraction,
    attachements,
    hashtags,
    content,
    onServiceClick,
  } = props;
  function handleServiceClick() {
    if (onServiceClick) {
      onServiceClick(id);
    }
  }
  return (
    <div className="w-full flex flex-col gap-2 cursor-pointer">
      {content && <EllipsisText wordBreak content={content} maxLines={3} />}
      <HashTags tags={hashtags || []} />
      <AspectRatio ratio={3 / 4}>
        <Slider>
          {Array.isArray(attachements)
            ? attachements.map((att) => (
                <SocialServicePostAttachment
                  id={id}
                  alt={name}
                  attachment={att}
                />
              ))
            : null}
        </Slider>
      </AspectRatio>
      <PostInteractions {...postInteraction} />
      <CommentInput />
      <PostCommentsList postId={id} />
    </div>
  );
};
