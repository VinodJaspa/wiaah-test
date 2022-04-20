import React from "react";
import {
  ChakraCarousel,
  ChakaraCarouselProps,
} from "ui/components/blocks/ChakaraCarousel";

export interface ControlledCarouselProps
  extends Omit<ChakaraCarouselProps, "activeItem" | "setActiveItem"> {}

export const ControlledCarousel: React.FC<ControlledCarouselProps> = ({
  children,
}) => {
  const [active, setActive] = React.useState<number>(0);
  return (
    <ChakraCarousel
      activeItem={active}
      children={children}
      setActiveItem={setActive}
      onCurrentActiveChange={setActive}
    />
  );
};
