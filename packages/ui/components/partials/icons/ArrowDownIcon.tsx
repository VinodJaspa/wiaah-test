import React from "react";
import { HtmlDivProps, HtmlSvgProps } from "types";
import { BiChevronDown } from "react-icons/bi";
export const ArrowDownIcon: React.FC<HtmlDivProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <BiChevronDown />
    </div>
  );
};

export const ArrowUpAltIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 10.5292C14.1556 10.5292 14.3061 10.5583 14.4515 10.6167C14.5977 10.675 14.7194 10.7528 14.8167 10.85L20.1833 16.2167C20.3972 16.4306 20.5042 16.7028 20.5042 17.0333C20.5042 17.3639 20.3972 17.6361 20.1833 17.85C19.9694 18.0639 19.6972 18.1708 19.3667 18.1708C19.0361 18.1708 18.7639 18.0639 18.55 17.85L14 13.3L9.45 17.85C9.23611 18.0639 8.96389 18.1708 8.63333 18.1708C8.30278 18.1708 8.03056 18.0639 7.81667 17.85C7.60278 17.6361 7.49583 17.3639 7.49583 17.0333C7.49583 16.7028 7.60278 16.4306 7.81667 16.2167L13.1833 10.85C13.3 10.7333 13.4264 10.6509 13.5625 10.6027C13.6986 10.5537 13.8444 10.5292 14 10.5292Z"
        fill="white"
      />
    </svg>
  );
};
