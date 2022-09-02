import React from "react";
import { IconBaseProps } from "react-icons";
import { BiTrash } from "react-icons/bi";

export interface TrashIconProps extends IconBaseProps {}

export const TrashIcon: React.FC<TrashIconProps> = (props) => {
  return <BiTrash {...props} />;
};
