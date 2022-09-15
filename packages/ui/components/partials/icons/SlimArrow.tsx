import React from "react";
import { HtmlSvgProps } from "types";

export const SlimRightArrow: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 22 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.3536 4.65043C21.5488 4.45517 21.5488 4.13858 21.3536 3.94332L18.1716 0.761341C17.9763 0.566079 17.6597 0.566079 17.4645 0.761341C17.2692 0.956603 17.2692 1.27319 17.4645 1.46845L20.2929 4.29688L17.4645 7.1253C17.2692 7.32056 17.2692 7.63715 17.4645 7.83241C17.6597 8.02767 17.9763 8.02767 18.1716 7.83241L21.3536 4.65043ZM0 4.79688H21V3.79688H0V4.79688Z"
        fill="currentColor"
      />
    </svg>
  );
};
