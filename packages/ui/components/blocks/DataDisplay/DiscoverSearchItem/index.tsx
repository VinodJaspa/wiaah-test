import React from "react";
import { Image } from "@chakra-ui/react";

interface DiscoverItemProps {
  thumbnail: string;
}

export const DiscoverItem: React.FC<DiscoverItemProps> = ({ thumbnail }) => {
  return <Image shadow={"md"} src={thumbnail} />;
};
