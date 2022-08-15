import { ServicePostType } from "api";
import React from "react";
import {
  AspectRatioImage,
  PostInteractions,
  PostCommentsList,
  CommentInput,
  CommentsViewer,
  ShowMapButton,
  HashTags,
  PostHead,
} from "ui";

export interface SocialServicePostCardProps extends ServicePostType {
  onServiceClick?: (id: string) => any;
}

export const SocialServicePostCard: React.FC<SocialServicePostCardProps> = ({
  id,
  label,
  name,
  postInteraction,
  thumbnail,
  type,
  user,
  hashtags,
  onServiceClick,
}) => {
  function handleServiceClick() {
    if (onServiceClick) {
      onServiceClick(id);
    }
  }
  return (
    <div
      onClick={() => handleServiceClick()}
      className="w-full flex flex-col gap-2 cursor-pointer"
    >
      {user && (
        <PostHead
          createdAt={new Date().toString()}
          creatorName={user.name}
          creatorPhoto={user.thumbnail}
          // onProfileClick={handleProfileClick}
          // onViewPostClick={handleViewPost}
        />
      )}
      {/* {postInfo.content && (
        <EllipsisText wordBreak content={postInfo.content} maxLines={3} />
      )} */}
      <HashTags
        style={{ pb: "0.5" }}
        color="primary.main"
        tags={hashtags || []}
      />
      <AspectRatioImage ratio={3 / 4} alt={name} src={thumbnail}>
        <div className="cursor-pointer absolute top-0 left-0 flex flex-col w-full text-lg bg-gray-500 bg-opacity-50 p-2 text-white">
          <p className="font-semibold  lg:text-2xl ">{name}</p>
          <p className="w-full text-lg font-bold text-right text-primary">
            {">>"} {label} {"<<"}
          </p>
        </div>
      </AspectRatioImage>
      <PostInteractions {...postInteraction} />
      <CommentInput />
      <PostCommentsList postId={id} />
      {/* <CommentsViewer comments={[]} /> */}
    </div>
  );
};
