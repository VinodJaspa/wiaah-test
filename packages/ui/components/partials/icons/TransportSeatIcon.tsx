import React from "react";
import { HtmlDivProps, HtmlSvgProps } from "types";
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

export const CarSeatOutlineIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.5 16.5L21.5 2C21.5 2 16.25 3 16.25 5C16.25 6.25 18.25 7 17.5 7.75C16.75 8.5 14 9.25 14 11.25C14 12.5 14.82 13.43 14 14.25C13.25 15 12.5 14.607 11.25 14.25C9.85 13.85 7 13.5 6 13.75C5 14 4 14.5 4 16C4 16.825 4.5 17.75 5.75 18C7 18.25 8.5 17 10.5 17C12.5 17 15 18.5 16.5 18.5C18 18.5 18.5 16.5 18.5 16.5Z"
        stroke="currentColor"
        stroke-linejoin="round"
      />
      <path
        d="M6 18L4.5 22H21L18 18"
        stroke="currentColor"
        stroke-linejoin="round"
      />
    </svg>
  );
};
