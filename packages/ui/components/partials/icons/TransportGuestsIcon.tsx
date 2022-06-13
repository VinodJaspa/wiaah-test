import React from "react";
import { HtmlDivProps } from "types";
import { HiUserGroup } from "react-icons/hi";

export interface TransportGuestsIconProps extends HtmlDivProps {}

export const TransportGuestsIcon: React.FC<TransportGuestsIconProps> = ({
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={`${className || ""}`}>
      <HiUserGroup />
    </div>
  );
};
