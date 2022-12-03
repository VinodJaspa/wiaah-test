import React from "react";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";

export interface HotelMarketDescriptionSectionProps {
  name: string;
  description: string;
  proprtyType: string;
}

export const HotelMarketDescriptionSection: React.FC<
  HotelMarketDescriptionSectionProps
> = ({ description, name, proprtyType }) => {
  const descriptionRef = usePublishRef("description");
  return (
    <div ref={descriptionRef} className="flex flex-col gap-8 ">
      <p className="text-xl md:text-3xl font-bold">{name}</p>
      <p className="text-lg md:text-xl font-semibold">{proprtyType}</p>
      <p className="md:text-lg">{description}</p>
    </div>
  );
};
