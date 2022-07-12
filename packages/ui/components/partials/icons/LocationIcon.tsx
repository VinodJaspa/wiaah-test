import React from "react";
import { HtmlDivProps } from "types";
import { HiLocationMarker, HiOutlineLocationMarker } from "react-icons/hi";
import { IconBaseProps } from "react-icons";

export const LocationIcon: React.FC<IconBaseProps> = (props) => {
  return <HiLocationMarker {...props} />;
};
export const LocationOutlineIcon: React.FC<IconBaseProps> = (props) => {
  return <HiOutlineLocationMarker {...props} />;
};
