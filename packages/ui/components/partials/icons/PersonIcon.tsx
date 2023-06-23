import React from "react";
import { HtmlDivProps, HtmlSvgProps } from "types";
import { BiUser } from "react-icons/bi";

export interface PersonIconProps extends HtmlDivProps {}

export const PersonIcon: React.FC<PersonIconProps> = ({
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={`${className || ""}`}>
      <BiUser />
    </div>
  );
};

export const PersonOutlineIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 3C9.383 3 7.25391 5.1291 7.25391 7.74609C7.25391 10.3631 9.383 12.4922 12 12.4922C14.617 12.4922 16.7461 10.3631 16.7461 7.74609C16.7461 5.1291 14.617 3 12 3ZM12 11.4375C9.96456 11.4375 8.30859 9.78153 8.30859 7.74609C8.30859 5.71065 9.96456 4.05469 12 4.05469C14.0354 4.05469 15.6914 5.71065 15.6914 7.74609C15.6914 9.78153 14.0354 11.4375 12 11.4375Z" />
      <path d="M13.4707 13.582H10.5293C8.09639 13.582 5.69539 14.7053 4.08984 17.1138V21H19.9102V17.1138C18.3069 14.7088 15.9066 13.582 13.4707 13.582ZM18.8555 19.9453H5.14453V17.4365C6.37609 15.6803 8.37722 14.6367 10.5293 14.6367H13.4707C15.6228 14.6367 17.6239 15.6803 18.8555 17.4365V19.9453Z" />
    </svg>
  );
};

export const PersonFillIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M332.64,64.58C313.18,43.57,286,32,256,32c-30.16,0-57.43,11.5-76.8,32.38-19.58,21.11-29.12,49.8-26.88,80.78C156.76,206.28,203.27,256,256,256s99.16-49.71,103.67-110.82C361.94,114.48,352.34,85.85,332.64,64.58Z" />
      <path d="M432,480H80A31,31,0,0,1,55.8,468.87c-6.5-7.77-9.12-18.38-7.18-29.11C57.06,392.94,83.4,353.61,124.8,326c36.78-24.51,83.37-38,131.2-38s94.42,13.5,131.2,38c41.4,27.6,67.74,66.93,76.18,113.75,1.94,10.73-.68,21.34-7.18,29.11A31,31,0,0,1,432,480Z" />
    </svg>
  );
};
