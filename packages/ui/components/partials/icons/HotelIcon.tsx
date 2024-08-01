import React from "react";
import { IconBaseProps } from "react-icons";

export interface HotelIconProps extends IconBaseProps {}

export const HotelIcon: React.FC<HotelIconProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_7_1119"
        // style={{"mask-type:liminance"}}
        maskUnits="userSpaceOnUse"
        x="1"
        y="1"
        width="1em"
        height="1em"
      >
        <path
          d="M2 2H22"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 2H5C4.44772 2 4 2.44772 4 3V21C4 21.5523 4.44772 22 5 22H19C19.5523 22 20 21.5523 20 21V3C20 2.44772 19.5523 2 19 2Z"
          fill="white"
          stroke="white"
          strokeLinejoin="round"
        />
        <path
          d="M10 16H14V22H10V16Z"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 6H8.5M7.5 9H8.5M11.5 6H12.5M11.5 9H12.5M15.5 6H16.5M15.5 9H16.5"
          stroke="black"
          strokeLinecap="round"
        />
        <path
          d="M2 22H22"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 16H15C15.276 16 15.505 15.774 15.452 15.503C15.176 14.083 13.7355 13 12 13C10.265 13 8.82396 14.0825 8.54796 15.503C8.49496 15.774 8.72396 16 8.99996 16H9.99996"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask0_7_1119)">
        <path d="M0 0H24V24H0V0Z" fill="white" />
      </g>
    </svg>
  );
};

export const HotelOutlineIcon: React.FC<HotelIconProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_9_1237"
        // style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="1"
        y="1"
        width="22"
        height="22"
      >
        <path
          d="M2 2H22"
          stroke="#20ECA7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 2H5C4.44772 2 4 2.44772 4 3V21C4 21.5523 4.44772 22 5 22H19C19.5523 22 20 21.5523 20 21V3C20 2.44772 19.5523 2 19 2Z"
          stroke="#20ECA7"
          strokeLinejoin="round"
        />
        <path
          d="M10 16H14V22H10V16Z"
          stroke="#20ECA7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 6H8.5M7.5 9H8.5M11.5 6H12.5M11.5 9H12.5M15.5 6H16.5M15.5 9H16.5"
          stroke="#20ECA7"
          strokeLinecap="round"
        />
        <path
          d="M2 22H22"
          stroke="#20ECA7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 16H15C15.276 16 15.505 15.774 15.452 15.503C15.176 14.083 13.7355 13 12 13C10.265 13 8.82401 14.0825 8.54801 15.503C8.49501 15.774 8.72401 16 9.00001 16H10"
          stroke="#20ECA7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask0_9_1237)">
        <path d="M0 0H24V24H0V0Z" fill="#707070" />
      </g>
    </svg>
  );
};
