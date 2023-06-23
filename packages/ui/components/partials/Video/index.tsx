import React, { DetailedHTMLProps, VideoHTMLAttributes } from "react";

export const Video: React.FC<
  DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>
> = (props) => {
  return <video {...props} />;
};
