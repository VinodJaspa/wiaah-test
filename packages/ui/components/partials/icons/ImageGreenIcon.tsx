import { HtmlSvgProps } from "types";
import React from "react";

export const ImageGreenIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      version="1.1"
      id="_x34_"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={"1em"}
      height={"1em"}
      {...props}
    >
      <g>
        <rect fill="#FFFFFF" width="512" height="334.584" />
        <g>
          <rect
            x="33.469"
            y="31.12"
            fill="#B9DECB"
            width="445.06"
            height="272.368"
          />
          {/* <ellipse
            opacity="0.8"
            // fill="#f00;"
            cx="215.561"
            cy="102.041"
            rx="35.299"
            ry="36.371"
          /> */}
          <g opacity="0.5">
            <path
              fill="#43B46E"
              d="M289.087,303.488H33.869l90.729-110.593c20.262-24.723,53.499-24.723,73.761,0l34.436,42.032
				L289.087,303.488z"
            />
          </g>
          <g opacity="0.5">
            <path
              fill="#43B46E"
              d="M478.53,253.946v49.542H180.261l56.499-68.561l75.154-91.099
				c20.816-25.389,55.058-25.389,75.873,0L478.53,253.946z"
            />
          </g>
        </g>
        <rect
          x="256"
          opacity="0.1"
          fill="#040000"
          width="256"
          height="334.584"
        />
      </g>
    </svg>
  );
};
