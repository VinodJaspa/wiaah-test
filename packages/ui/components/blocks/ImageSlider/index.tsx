import React from "react";
import SimpleImageSlider from "react-simple-image-slider";
import { useMediaQuery } from "react-responsive";

const images = [
  { url: "/shop.jpeg" },
  { url: "/shop-2.jpeg" },
  { url: "/shop-3.jpeg" },
];

export const ImageSlider: React.FC = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1980px)" });
  return (
    <>
      <div className="flex w-full justify-center">
        <SimpleImageSlider
          autoPlay
          width="100%"
          height={isTabletOrMobile ? 230 : isLargeScreen ? 500 : 350}
          images={images}
          showBullets={true}
          showNavs={false}
        />
      </div>
    </>
  );
};
