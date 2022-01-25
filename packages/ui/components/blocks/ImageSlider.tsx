import React from "react";
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  { url: "/shop.jpeg" },
  { url: "/shop-2.jpeg" },
  { url: "/shop-3.jpeg" },
];

export const ImageSlider: React.FC = () => {
  return (
    <>
      <div className="flex w-full justify-center">
        <SimpleImageSlider
          autoPlay
          width="100%"
          height={500}
          images={images}
          showBullets={true}
          showNavs={true}
        />
      </div>
    </>
  );
};
