import { HtmlSvgProps } from "@UI/../types/src";
import React from "react";
import { IconBaseProps } from "react-icons";
import { BsEye } from "react-icons/bs";
export interface EyeIconProps extends IconBaseProps {}

export const EyeIcon: React.FC<EyeIconProps> = (props) => {
  return <BsEye {...props} />;
};

export const EyeIconSlash: React.FC<HtmlSvgProps> = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_3_1829)">
        <path
          d="M0.285306 8.81668L0.213065 9L0.285306 9.18332C1.65527 12.6597 5.03746 15.125 9.00049 15.125C12.9635 15.125 16.3457 12.6597 17.7157 9.18332L17.7879 9L17.7157 8.81668C16.3457 5.34031 12.9635 2.875 9.00049 2.875C5.03746 2.875 1.65527 5.34031 0.285306 8.81668ZM9.00049 12.25C7.20663 12.25 5.75049 10.7939 5.75049 9C5.75049 7.20614 7.20663 5.75 9.00049 5.75C10.7943 5.75 12.2505 7.20614 12.2505 9C12.2505 10.7939 10.7943 12.25 9.00049 12.25ZM9.00049 6.25C7.47935 6.25 6.25049 7.47886 6.25049 9C6.25049 10.5211 7.47935 11.75 9.00049 11.75C10.5216 11.75 11.7505 10.5211 11.7505 9C11.7505 7.47886 10.5216 6.25 9.00049 6.25Z"
          stroke="currentColor"
        />
        <path
          d="M0.75 13.875L17.2841 4.32902"
          stroke="currentColor"
          stroke-linecap="round"
        />
      </g>
      {/* <defs>
        <clipPath id="clip0_3_1829">
          <rect width="1em" height="1em" fill="white" />
        </clipPath>
      </defs> */}
    </svg>
  );
};
