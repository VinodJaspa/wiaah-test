import React from "react";
import { HtmlDivProps, HtmlImgProps } from "types";
import { AspectRatio, Image } from "ui";
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
      } rounded-full overflow-hidden bg-black relative w-12`}
    >
      <AspectRatio ratio={1}>
        <Image
          onClick={handleAvatarClick}
          src={photoSrc || src}
          className={`w-full h-full overflow-hidden rounded-full  cursor-pointer object-cover`}
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
