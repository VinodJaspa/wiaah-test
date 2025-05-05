import React, { useState } from "react";
import { HtmlDivProps } from "types";
import { FloatingContainer, FloatingContainerProps } from "@UI";
import { AspectRatio, Image, SocialStoryModal, SocialStoryType } from "@UI";

export type StoryUserData = {
  id: string;
  name: string;
  userPhotoSrc: string;
};

export interface StoryDisplayProps {
  story?: SocialStoryType;
  storyUserData?: StoryUserData;
  seen?: boolean;
  floatingIcon?: FloatingContainerProps;
  innerProps?: HtmlDivProps;
  onProfileClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}

export const UserProfileDisplay: React.FC<StoryDisplayProps> = ({
  story,
  storyUserData,
  seen,
  floatingIcon,
  onProfileClick,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const onStoryClick = () => {
    setShowModal(true);
  };
  return (
    <FloatingContainer
      className="w-full"
      {...floatingIcon}
      onClick={() => onProfileClick && onProfileClick()}
    >
      {story && showModal && (
        <SocialStoryModal storyData={story} profileId="4" />
      )}
      <div
        className={`${
          seen ? "p-[0rem]" : "p-[0.20rem]"
        } rounded-full bg-gradient-to-b from-primary to-blue-400`}
      >
        <div className="w-full h-full overflow-hidden rounded-full bg-white p-[0.125rem]">
          <AspectRatio
            onClick={() => onProfileClick && onProfileClick()}
            className={"cursor-pointer"}
            ratio={1}
          >
            <Image
              className="w-full h-full rounded-full object-cover"
              src={story ? story.publisher.photo : storyUserData.userPhotoSrc}
            />
          </AspectRatio>
        </div>
      </div>
    </FloatingContainer>
  );
};
