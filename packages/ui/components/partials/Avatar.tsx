import React from "react";
import { HtmlDivProps, HtmlImgProps } from "types";
import { AspectRatio } from "ui";
export interface AvatarProps extends HtmlImgProps {
  name?: string;
  photoSrc?: string;
  src?: string;
  newStory?: boolean;
  onClick?: () => any;
  showBorder?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  photoSrc,
  newStory,
  onClick,
  showBorder = true,
  children,
  src,
  className,
  ...props
}) => {
  function handleAvatarClick() {
    if (onClick) {
      onClick();
    }
  }

  return (
    <div
      className={`${
        className || ""
      } relative w-12 rounded-full overflow-hidden`}
    >
      <AspectRatio ratio={1}>
        <img
          onClick={handleAvatarClick}
          src={photoSrc || src}
          className={`w-full h-full bg-black cursor-pointer object-cover`}
          {...props}
        />

        {children}
      </AspectRatio>
    </div>
  );
};

export interface AvatarBadgeProps extends HtmlDivProps {}

export const AvatarBadge: React.FC<AvatarBadgeProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div {...props} className={`${className || ""} absolute bottom-0 right-0`}>
      {children}
    </div>
  );
};
