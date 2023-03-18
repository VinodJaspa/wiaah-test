import { HtmlDivProps } from "@UI/../types/src";
import React from "react";

export const Skeleton: React.FC<HtmlDivProps> = (props) => {
  return <Skeleton {...props} />;
};

export const SkeletonText: React.FC<HtmlDivProps> = (props) => {
  return <SkeletonText {...props}></SkeletonText>;
};

export const SkeletonCircle: React.FC<HtmlDivProps> = (props) => {
  return <SkeletonCircle {...props}></SkeletonCircle>;
};
