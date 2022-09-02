import React from "react";
import { IconBaseProps } from "react-icons";
import { BsEye } from "react-icons/bs";
export interface EyeIconProps extends IconBaseProps {}

export const EyeIcon: React.FC<EyeIconProps> = (props) => {
  return <BsEye {...props} />;
};
