import {
  Avatar as ChakaraAvatar,
  ThemingProps,
  AvatarProps as ChakraAvatarProps,
} from "@chakra-ui/react";
import React from "react";
import { HtmlDivProps } from "types";

export interface AvatarProps extends ChakraAvatarProps {
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
  ...props
}) => {
  function handleAvatarClick() {
    if (onClick) {
      onClick();
    }
  }

  return (
    <ChakaraAvatar
      onClick={handleAvatarClick}
      showBorder={showBorder}
      name={name}
      src={photoSrc || src}
      // sx={{
      //   img: {
      //     height: "auto",
      //     width: "100%",
      //   },
      // }}
      cursor={"pointer"}
      borderColor={newStory ? "crimson" : "white"}
      bgColor="black"
      borderWidth={showBorder ? "0.25rem" : "0px"}
      {...props}
    >
      {children}
    </ChakaraAvatar>
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
