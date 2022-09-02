import React from "react";
import { IconBaseProps } from "react-icons";
import { FaHotel } from "react-icons/fa";

export interface HotelIconProps extends IconBaseProps {}

export const HotelIcon: React.FC<HotelIconProps> = (props) => {
  return <FaHotel {...props} />;
};
