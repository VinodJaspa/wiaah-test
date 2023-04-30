import { HtmlSvgProps } from "@UI/../types/src";
import React from "react";

export const HealthCenterFillIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 20H23V22H1V20H3V3C3 2.73478 3.10536 2.48043 3.29289 2.29289C3.48043 2.10536 3.73478 2 4 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V20ZM11 8H9V10H11V12H13V10H15V8H13V6H11V8ZM14 20H16V14H8V20H10V16H14V20Z"
        fill="white"
        stroke="#111312"
      />
    </svg>
  );
};

export const HealthCenterOutlineIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.5 20H23.5V22H1.5V20H3.5V3C3.5 2.73478 3.60536 2.48043 3.79289 2.29289C3.98043 2.10536 4.23478 2 4.5 2H20.5C20.7652 2 21.0196 2.10536 21.2071 2.29289C21.3946 2.48043 21.5 2.73478 21.5 3V20ZM11.5 8H9.5V10H11.5V12H13.5V10H15.5V8H13.5V6H11.5V8ZM14.5 20H16.5V14H8.5V20H10.5V16H14.5V20Z"
        stroke="#707070"
      />
    </svg>
  );
};
