import { HtmlSvgProps } from "@UI/../types/src";
import React from "react";

export const X1CircleIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15" cy="15" r="14" stroke="currentColor" strokeWidth="1.14" />
      <path
        d="M10.9139 20.375H12.5045V9.89423H10.8993L8.13932 11.8553V13.4532L10.8775 11.5067H10.9139V20.375ZM14.1521 20.375H15.9534L18.5972 16.3802H18.648L21.2555 20.375H23.1585L19.6721 15.1746V15.131L23.2238 9.89423H21.3863L18.7715 13.9471H18.7134L16.1277 9.89423H14.1884L17.6312 15.0729V15.1237L14.1521 20.375Z"
        fill="currentColor"
      />
    </svg>
  );
};
