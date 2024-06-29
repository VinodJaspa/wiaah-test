import React, { DetailedHTMLProps, VideoHTMLAttributes } from "react";

export const Video: React.FC<
  DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>
> = (props) => {
  // @ts-ignore
  return <video {...props} />;
};
