import React from "react";
import { HtmlSvgProps } from "types";

export const ArrowRoundBack: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width={"1em"}
      height={"1em"}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
    >
      <g>
        <g>
          <path d="M320,112H192V48h-32L0,208l160,160h32v-64h160c88.365,0,112,71.635,112,160h48V304C512,197.962,426.038,112,320,112z" />
        </g>
      </g>
    </svg>
  );
};

export const ArrowRoundBackOutline: React.FC<HtmlSvgProps> = (props) => (
  <svg
    {...props}
    width={"1em"}
    height={"1em"}
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 512 512"
  >
    <g>
      <g>
        <path
          d="M317.959,115.859H210.158V58.365h-44.864L0,223.66l165.294,165.294h44.864V331.46h136.548
			c67.367,0,122.174,54.807,122.174,122.174H512V309.9C512,202.905,424.953,115.859,317.959,115.859z M468.88,342.412
			c-30.253-33.206-73.82-54.071-122.174-54.071H167.038v41.378L60.981,223.661l106.057-106.057v41.375h150.921
			c83.219,0,150.921,67.703,150.921,150.921V342.412z"
        />
      </g>
    </g>
  </svg>
);
