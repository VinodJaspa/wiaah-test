import React from "react";
import { HtmlDivProps } from "types";
import { GiCarSeat } from "react-icons/gi";

export interface TransportSeatIconProps extends HtmlDivProps {}

export const TransportSeatIcon: React.FC<TransportSeatIconProps> = ({
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={`${className || ""}`}>
      <GiCarSeat />
    </div>
  );
};
