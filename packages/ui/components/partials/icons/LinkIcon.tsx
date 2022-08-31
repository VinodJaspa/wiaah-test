import React from "react";
import { IconBaseProps } from "react-icons";
import { BiLink } from "react-icons/bi";

export interface LinkIconProps extends IconBaseProps {}

export const LinkIcon: React.FC<LinkIconProps> = (props) => {
  return <BiLink {...props} />;
};
