import React from "react";
import { AspectRatioProps, AspectRatio, Image } from "@UI";

export interface AspectRatioImageProps extends AspectRatioProps {
  src: string;
  alt: string;
}

export const AspectRatioImage: React.FC<AspectRatioImageProps> = ({
  alt,
  src,
  children,
  ...props
}) => {
  return (
    <AspectRatio {...props}>
      <Image className="w-full h-full object-cover" src={src} alt={alt} />
      {children}
    </AspectRatio>
  );
};
