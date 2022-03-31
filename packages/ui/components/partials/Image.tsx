import React from "react";
import { CSSValueUnit } from "types/sharedTypes/css/valueUnit";
import { Size } from "types/sharedTypes/css/size";
import { CSSValueUnitToString } from "../helpers/CSSValueUnitToString";
const sizes = {
  sm: {
    min: 2,
    max: 3,
  },
  md: {
    min: 4,
    max: 6,
  },
  lg: {
    min: 6,
    max: 9,
  },
  xl: {
    min: 8,
    max: 12,
  },
};
export interface ImageProps {
  src: string;
  fit?: "contain" | "cover";
  rotation?: "landscape" | "portrait";
  size?: Size;
  width?: CSSValueUnit;
  height?: CSSValueUnit;
  fitHeight?: boolean;
  fitWidth?: boolean;
}
export const Image: React.FC<ImageProps> = ({
  src,
  fit = "cover",
  rotation = "landscape",
  size = "md",
  width,
  height,
  fitHeight,
  fitWidth,
}) => {
  const { w, h } = getSizeInRem(size, rotation);
  const styles: React.CSSProperties = {
    width: fitWidth ? "fit-content" : width ? CSSValueUnitToString(width) : w,
    height: fitHeight
      ? "fit-content"
      : height
      ? CSSValueUnitToString(height)
      : h,
  };

  return (
    <div style={styles}>
      <img className={`h-full w-full object-${fit}`} src={src} />
    </div>
  );
};

function getSizeInRem(size: Size, rotation: "landscape" | "portrait") {
  let { height, width }: { width: string; height: string } = {
    width: "",
    height: "",
  };
  if (rotation === "landscape") {
    width = `${sizes[size].max}rem`;
    height = `${sizes[size].min}rem`;
  } else if (rotation === "portrait") {
    width = `${sizes[size].min}rem`;
    height = `${sizes[size].max}rem`;
  }
  return { w: width, h: height };
}
