import { t } from "i18next";
import React from "react";
import { Spacer } from "../partials";
import { Carousel } from "./Carousel";
import { ImageCard } from "./ImageCard";

export const HorizontalCollaboration: React.FC = () => {
  return (
    <div className="h-full w-full">
      <div className="flex w-full justify-center">
        <p className="text-2xl font-bold uppercase">
          {t("Collaboration", "Collaboration")}
        </p>
      </div>
      <Spacer />
      <Carousel controls componentsPerView={4}>
        {/* <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"> */}
        {[...Array(4)].map((_, i: number) => (
          <ImageCard key={i} name="Item Name" imgUrl="/shop-2.jpeg" />
        ))}
        {/* </div> */}
      </Carousel>
      <Spacer />
    </div>
  );
};
