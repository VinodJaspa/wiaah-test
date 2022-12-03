import React from "react";
import { IconBaseProps } from "react-icons";
import { BsHouse } from "react-icons/bs";

export interface HouseIconProps extends IconBaseProps {}

export const HouseIcon: React.FC<HouseIconProps> = (props) => {
  return <BsHouse {...props} />;
};
