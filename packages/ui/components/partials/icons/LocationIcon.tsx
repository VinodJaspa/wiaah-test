import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import { IconBaseProps } from "react-icons";
import { Button, ButtonProps } from "@UI";
import { HtmlSvgProps } from "types";

export const LocationIcon: React.FC<IconBaseProps> = (props) => {
  return <HiLocationMarker className="text-white" {...props} />;
};
export const LocationOutlineIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="0.8em"
      height="1em"
      viewBox="0 0 8 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinejoin="evenodd"
        clipRule="evenodd"
        d="M4 9.59429L4.36057 9.188C4.76971 8.71943 5.13771 8.27486 5.46514 7.852L5.73543 7.49543C6.864 5.97486 7.42857 4.768 7.42857 3.876C7.42857 1.972 5.89371 0.428574 4 0.428574C2.10628 0.428574 0.571426 1.972 0.571426 3.876C0.571426 4.768 1.136 5.97486 2.26457 7.49543L2.53486 7.852C3.00196 8.45051 3.49067 9.03128 4 9.59429Z"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 5.28572C4.78898 5.28572 5.42857 4.64612 5.42857 3.85715C5.42857 3.06817 4.78898 2.42857 4 2.42857C3.21102 2.42857 2.57143 3.06817 2.57143 3.85715C2.57143 4.64612 3.21102 5.28572 4 5.28572Z"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LocationIconButton: React.FC<
  ButtonProps & { outline?: boolean; iconProps?: IconBaseProps }
> = ({ outline, iconProps, ...props }) => {
  return (
    <Button {...props}>
      {outline ? (
        <LocationOutlineIcon {...iconProps} />
      ) : (
        <LocationIcon {...iconProps} />
      )}
    </Button>
  );
};

export const LocationFillSquareIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinejoin="evenodd"
        clipRule="evenodd"
        d="M22 31.1886L22.7211 30.376C23.5394 29.4389 24.2754 28.5497 24.9303 27.704L25.4709 26.9909C27.728 23.9497 28.8571 21.536 28.8571 19.752C28.8571 15.944 25.7874 12.8571 22 12.8571C18.2126 12.8571 15.1429 15.944 15.1429 19.752C15.1429 21.536 16.272 23.9497 18.5291 26.9909L19.0697 27.704C20.0039 28.901 20.9813 30.0625 22 31.1886Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.14286"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 22.5714C23.578 22.5714 24.8571 21.2922 24.8571 19.7143C24.8571 18.1363 23.578 16.8571 22 16.8571C20.422 16.8571 19.1429 18.1363 19.1429 19.7143C19.1429 21.2922 20.422 22.5714 22 22.5714Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="1.14286"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="1" y="1" width="42" height="42" rx="4" stroke="#EFEFEF" />
    </svg>
  );
};
