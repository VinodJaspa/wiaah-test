import React from "react";
import { HtmlImgProps } from "types";

export interface ImageProps extends HtmlImgProps {
  onDimLoad?: (dim: { h: number; w: number; x: number; y: number }) => any;
  isLoading?: boolean;
}

export const Image: React.FC<ImageProps> = ({ onDimLoad, ...props }) => {
  const ref = React.useRef<HTMLImageElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      if (ref.current.complete) {
        onDimLoad &&
          onDimLoad({
            h: ref.current.height,
            w: ref.current.width,
            x: ref.current.x,
            y: ref.current.y,
          });
      } else {
        ref.current.onload = (v) => {
          onDimLoad &&
            onDimLoad({
              h: ref.current?.height || 0,
              w: ref.current?.width || 0,
              x: ref.current?.x || 0,
              y: ref.current?.y || 0,
            });
        };
      }
    }
  }, [ref]);
  return <img ref={ref} {...props} />;
};
