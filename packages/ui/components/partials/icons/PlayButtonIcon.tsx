import React from "react";
import { HtmlSvgProps } from "types";

export const PlayButtonFillIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 260 180"
      enable-background="new 0 0 260 180"
    >
      <path
        d="M220,2H40C19.01,2,2,19.01,2,40v100c0,20.99,17.01,38,38,38h180c20.99,0,38-17.01,38-38V40C258,19.01,240.99,2,220,2z
	 M102,130V50l68,40L102,130z"
      />
    </svg>
  );
};

export const PlayFillIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1.27em"
      viewBox="0 0 11 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.01204e-06 1.82001V12.18C2.01204e-06 12.97 0.870002 13.45 1.54 13.02L9.68 7.84001C9.82251 7.74982 9.9399 7.62505 10.0212 7.47731C10.1026 7.32957 10.1452 7.16366 10.1452 6.99501C10.1452 6.82636 10.1026 6.66045 10.0212 6.51271C9.9399 6.36497 9.82251 6.2402 9.68 6.15001L1.54 0.980011C1.38917 0.882456 1.2148 0.827418 1.0353 0.820705C0.855793 0.813991 0.677803 0.855851 0.520105 0.941868C0.362408 1.02788 0.23085 1.15487 0.13931 1.30943C0.0477698 1.46398 -0.000358634 1.64038 2.01204e-06 1.82001Z"
        fill="currentColor"
      />
    </svg>
  );
};
