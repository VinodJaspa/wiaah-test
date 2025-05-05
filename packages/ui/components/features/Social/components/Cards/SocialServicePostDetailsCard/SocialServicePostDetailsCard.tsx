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
  Service,
} from "@UI";
import { ServicePost } from "@features/API";

type Post = Pick<ServicePost, "id" | "comments" | "reactionNum"> & {
  service: Pick<Service, "presentation" | "title" | "hashtags">;
};

export interface SocialServicePostDetailsCardProps {
  post: Post;
  onServiceClick?: (post: Post) => any;
}

export const SocialServicePostDetailsCard: React.FC<
  SocialServicePostDetailsCardProps
> = ({ post, onServiceClick }) => {
  function handleServiceClick() {
    if (onServiceClick) {
      onServiceClick(post);
    }
  }
  return (
    <div className="w-full flex flex-col gap-2 cursor-pointer">
      {post.service.title && (
        <EllipsisText wordBreak content={post.service.title} maxLines={3} />
      )}
      <HashTags tags={post.service.hashtags || []} />
      <AspectRatio ratio={3 / 4}>
        <Slider>
          {Array.isArray(post.service.presentation)
            ? post.service.presentation.map((att) => (
                <SocialServicePostAttachment
                  id={post.id}
                  alt={post.service.title}
                  attachment={att}
                />
              ))
            : null}
        </Slider>
      </AspectRatio>
      <PostInteractions likes={post.reactionNum} comments={post.comments} shares={0} />
      <CommentInput />
      <PostCommentsList postId={post.id} />
    </div>
  );
};
