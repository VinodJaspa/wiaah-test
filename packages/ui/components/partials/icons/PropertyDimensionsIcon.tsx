import React from "react";
import { HtmlDivProps } from "types";

export interface PropertyDimensionsIconProps extends HtmlDivProps {}

export const PropertyDimensionsIcon: React.FC<PropertyDimensionsIconProps> = ({
  className,
  ...rest
}) => {
  return (
    <div {...rest}>
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width={"16"}
        height={"16"}
        viewBox="0 0 490.011 490.011"
      >
        <g>
          <path
            d="M482.148,366.831l-97.6-88.6c-8.3-8.3-21.8-7.3-29.1,1c-8.3,8.3-7.3,21.9,1,29.2l57.8,52.1h-285v-286.2l51.9,58.1
		c4.2,4.2,16.8,11,30.1,1c8.3-8.3,8.3-20.8,1-29.2l-88.2-98c-7.3-8.3-22.8-8.3-30.1,0l-88.2,98c-8.3,8.3-7.3,21.9,1,29.2
		c8.3,8.3,21.8,7.3,29.1-1l51.9-58.1v306.1c0,11.5,9.3,20.8,20.8,20.8h307.1l-59,53.2c-8.3,8.3-8.3,20.8-1,29.2
		c12.9,11.6,25.2,4.5,29.1,1l97.6-86.5C492.748,389.831,492.448,376.031,482.148,366.831z"
          />
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
    </div>
  );
};
