import { Avatar as ChakaraAvatar, ThemingProps } from "@chakra-ui/react";
import React from "react";

export interface AvatarProps {
  name: string;
  photoSrc: string;
  newStory?: boolean;
  onClick?: () => any;
  size?:
    | (string & {})
    | "2xl"
    | "2xs"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "full"
    | undefined;
  showBorder?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  photoSrc,
  newStory,
  onClick,
  showBorder,
  size,
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
      size={size}
      name={name}
      src={photoSrc}
      sx={{
        img: {
          height: "auto",
          width: "100%",
        },
      }}
      cursor={"pointer"}
      borderColor={newStory ? "crimson" : "white"}
      bgColor="black"
      borderWidth={"0.25rem"}
    />
  );
};
