import React from "react";
import { AspectRatioProps, AspectRatio } from "ui";

export interface AspectRatioImageProps extends AspectRatioProps {
  src: string;
  alt: string;
}

export const AspectRatioImage: React.FC<AspectRatioImageProps> = ({
  alt,
  src,
  ...props
}) => {
  return (
    <AspectRatio {...props}>
      <img className="w-full h-full object-cover" src={src} alt={alt} />
    </AspectRatio>
  );
};
