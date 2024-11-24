import React from "react";
import { AspectRatioProps, AspectRatio, Image } from "@UI";
import { cn } from "utils";

export interface AspectRatioImageProps extends AspectRatioProps {
  src: string;
  alt: string;
  ratio: number;
  children?: React.ReactNode; // Add this line
  onClick?: () => void;
  className?: string;
  imageClassName?: string;
}

export const AspectRatioImage: React.FC<AspectRatioImageProps> = ({
  alt,
  src,
  ratio,
  className,
  children,
  onClick,
  imageClassName,
  ...props
}) => {
  return (
    <AspectRatio
      ratio={ratio}
      {...props}
      className={` ${className}`}
      onClick={onClick}
    >
      <Image
        className={cn("w-full h-full object-cover", imageClassName)}
        src={src}
        alt={alt}
      />
      {children}
    </AspectRatio>
  );
};
