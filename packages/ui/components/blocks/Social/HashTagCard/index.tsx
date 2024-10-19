import React from "react";
import { useTranslation } from "react-i18next";
import { PostCard, PostCardProps } from "../PostCard";

export interface HashTagCardProps {
  post: PostCardProps["post"]["postInfo"];
  profile: PostCardProps["post"]["profileInfo"];
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
        <PostCard post={{ postInfo: post, profileInfo: profile }} />
      </div>
    </div>
  );
};
