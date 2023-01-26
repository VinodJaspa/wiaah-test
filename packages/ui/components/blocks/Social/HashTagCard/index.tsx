import React from "react";
import { useTranslation } from "react-i18next";
import { PostAttachment, PostCard, PostCardProps } from "@UI";

export interface HashTagCardProps {
  post: PostCardProps["postInfo"];
  profile: PostCardProps["profileInfo"];
  title: string;
  onViewPost?: () => void;
}

export const HashTagCard: React.FC<HashTagCardProps> = ({
  title,
  post,
  profile,
  onViewPost,
}) => {
  const { t } = useTranslation();
  function handleViewPostClick() {
    onViewPost && onViewPost();
  }

  return (
    <div className="flex gap-2 p-2 shadow-md rounded-lg bg-white items-center flex-col">
      <p data-testid="CardTitle" className="font-bold">
        {title}
      </p>
      <div className="flex justify-center items-center w-full h-96">
        <PostCard postInfo={post} profileInfo={profile} />
      </div>
    </div>
  );
};
