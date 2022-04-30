import React from "react";
import {
  ChakraCarousel,
  ChakaraCarouselProps,
} from "ui/components/blocks/ChakaraCarousel";

export interface ControlledCarouselProps
  extends Omit<ChakaraCarouselProps, "activeItem" | "setActiveItem"> {}

export const ControlledCarousel: React.FC<ControlledCarouselProps> = ({
  children,
  ...props
}) => {
  const [active, setActive] = React.useState<number>(0);
  React.useEffect(() => {
    setActive(0);
  }, [children]);
  return (
    <ChakraCarousel
      {...props}
      bg="black"
      trackStyle={{ h: "100%" }}
      activeItem={active}
      children={children}
      setActiveItem={setActive}
      onCurrentActiveChange={setActive}
    />
  );
};
