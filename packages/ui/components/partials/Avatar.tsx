import React from "react";
import { HtmlDivProps, HtmlImgProps } from "types";

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
    <img
      onClick={handleAvatarClick}
      // showBorder={showBorder}
      // name={name}
      src={photoSrc || src}
      // borderColor={newStory ? "crimson" : "white"}
      // bgColor="black"
      // borderWidth={showBorder ? "0.25rem" : "0px"}
      className={`${className || ""} w-12 h-12 rounded-full cursor-pointer`}
      {...props}
    >
      {children}
    </img>
  );
};

export interface AvatarBadgeProps extends HtmlDivProps {}

export const AvatarBadge: React.FC<AvatarBadgeProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div {...props} className={`${className || ""} `}>
      {children}
    </div>
  );
};
