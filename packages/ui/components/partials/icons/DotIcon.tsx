import React from "react";
import { IconBaseProps } from "react-icons";
import { BsDot } from "react-icons/bs";

export interface DotIconProps extends IconBaseProps {}

export const DotIcon: React.FC<DotIconProps> = (props) => {
  return <BsDot {...props} />;
};
