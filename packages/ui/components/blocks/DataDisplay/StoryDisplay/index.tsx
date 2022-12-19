import React from "react";
import { HtmlDivProps } from "types";
import { FloatingContainer, FloatingContainerProps } from "@UI";
import { AspectRatio, Image } from "@UI";

export type StoryUserData = {
  id: string;
  name: string;
  userPhotoSrc: string;
};

export interface StoryDisplayProps {
  storyUserData: StoryUserData;
  seen?: boolean;
  floatingIcon?: FloatingContainerProps;
  innerProps?: HtmlDivProps;
  onProfileClick?: () => any;
}

export const UserProfileDisplay: React.FC<StoryDisplayProps> = ({
  storyUserData,
  seen,
  floatingIcon,
  onProfileClick,
}) => {
  return (
    <FloatingContainer className="w-full" {...floatingIcon}>
      <div
        className={`${
          seen ? "p-[0.0625rem]" : "p-[0.20rem]"
        } rounded-[20%] bg-gradient-to-b from-primary to-blue-400`}
      >
        <div className="w-full h-full overflow-hidden rounded-[20%] bg-white p-[0.125rem]">
          <AspectRatio
            onClick={() => onProfileClick && onProfileClick()}
            className={"cursor-pointer"}
            ratio={1}
          >
            <Image
              className="w-full h-full rounded-[20%] object-cover"
              src={storyUserData.userPhotoSrc}
            />
          </AspectRatio>
        </div>
      </div>
    </FloatingContainer>
  );
};
