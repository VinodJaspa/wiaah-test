import React from "react";
import { AspectRatioProps, AspectRatio, Image } from "@UI";

export interface AspectRatioImageProps extends AspectRatioProps {
  src: string;
  alt: string;
  ratio: number;
  children?: React.ReactNode; // Add this line
  onClick?: () => void;
  className?: string;
}

export const AspectRatioImage: React.FC<AspectRatioImageProps> = ({
  alt,
  src,
  ratio,
  className,
  children,
  onClick,
  ...props
}) => {
  return (
    <AspectRatio
      ratio={ratio}
      {...props}
      className={` ${className}`}
      onClick={onClick}
    >
      <Image className="w-full h-full object-cover" src={src} alt={alt} />
      {children}
    </AspectRatio>
  );
};
