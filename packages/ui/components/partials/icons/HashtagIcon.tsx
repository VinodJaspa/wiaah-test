import React from "react";
import { HtmlSvgProps } from "types";

export const HashtagIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      version="1.1"
      width={"1em"}
      height={"1em"}
      viewBox="0 0 281.465 281.465"
    >
      <path
        d="M273.661,114.318V67.035h-45.558L236.886,0h-47.69l-8.783,67.035h-60.084L129.113,0H81.425L72.64,67.035H7.804v47.283
	h58.649l-6.904,52.791H7.804v47.289h45.559l-8.784,67.066h47.687l8.787-67.066h60.083l-8.786,67.066h47.691l8.783-67.066h64.836
	v-47.289h-58.647l6.901-52.791H273.661z M167.326,167.109h-60.084l6.9-52.791h60.082L167.326,167.109z"
      />
    </svg>
  );
};

export const HashtagCircleIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="21" cy="21" r="17.5" fill="white" stroke="#EFEFEF" />
      <path
        d="M25.7251 13.1251L22.5751 28.8751M19.4251 13.1251L16.2751 28.8751M14.7001 17.8501H28.8751M13.1251 24.1501H27.3001"
        stroke="currentColor"
        stroke-width="1.14286"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
