import React from "react";
import { HtmlDivProps } from "types";
import { MdLuggage } from "react-icons/md";

export interface TransportLuggageIconProps extends HtmlDivProps {}

export const TransportLuggageIcon: React.FC<TransportLuggageIconProps> = ({
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={`${className || ""}`}>
      <MdLuggage />
    </div>
  );
};
