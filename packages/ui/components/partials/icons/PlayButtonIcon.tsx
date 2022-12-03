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
