import React from "react";
import { HtmlImgProps } from "types";

export interface ImageProps extends HtmlImgProps {}
export const Image: React.FC<ImageProps> = (props) => {
  return <img {...props} />;
};
