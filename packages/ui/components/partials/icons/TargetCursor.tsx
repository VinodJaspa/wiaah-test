import React from "react";
import { IconBaseProps } from "react-icons";
import { FiTarget } from "react-icons/fi";

export interface TargetCursorIconProps extends IconBaseProps {}

export const TargetCursorIcon: React.FC<TargetCursorIconProps> = (props) => {
  return <FiTarget />;
};
