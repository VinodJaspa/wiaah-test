import { useSocialControls } from "@blocks";
import { Avatar } from "@partials";
import React from "react";

export const SocialAvatarWithStory: React.FC<{
  src: string;
  userId: string;
  hasNewStory: boolean;
  className?: string;
}> = ({ hasNewStory, src, userId, className }) => {
  const { viewUserStory } = useSocialControls();
  return (
    <Avatar
      className={className}
      src={src}
      showBorder={hasNewStory}
      onClick={() => (hasNewStory ? viewUserStory(userId) : null)}
    />
  );
};
