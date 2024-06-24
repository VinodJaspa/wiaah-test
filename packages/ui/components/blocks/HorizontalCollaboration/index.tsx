import React from "react";
import { useTranslation } from "react-i18next";
import { Spacer, Carousel, ImageCard, ChakraCarousel } from "@UI";

export const HorizontalCollaboration: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="h-full w-full">
      <div className="flex w-full justify-center">
        <p className="text-2xl font-bold uppercase">
          {t("Collaboration", "Collaboration")}
        </p>
      </div>
      <Spacer />
      <ChakraCarousel setActiveItem={() => { }} swipe>
        {[...Array(4)].map((_, i: number) => (
          <div className="pointer-events-none" key={i}>
            <ImageCard key={i} name="Item Name" imgUrl="/shop-2.jpeg" />
          </div>
        ))}
      </ChakraCarousel>
      <Spacer />
    </div>
  );
};
