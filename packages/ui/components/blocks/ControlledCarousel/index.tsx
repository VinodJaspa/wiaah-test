import React from "react";
import { Carousel } from "@UI";
import { CarouselProps } from '../ChakaraCarousel/index';

export interface ControlledCarouselProps extends CarouselProps {}


export const ControlledCarousel: React.FC<ControlledCarouselProps> = ({
  children,
  ...props
}) => {
  const [active, setActive] = React.useState<number>(0);
  React.useEffect(() => {
    setActive(0);
  }, [children]);
  return (
    <Carousel
      {...props}
      className="bg-black"
      trackStyle={{ h: "100%" }}
      activeItem={active}
      children={children}
      setActiveItem={setActive}
      onCurrentActiveChange={setActive}
    />
  );
};
