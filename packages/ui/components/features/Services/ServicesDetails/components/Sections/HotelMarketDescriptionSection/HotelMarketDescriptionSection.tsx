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
    <div ref={descriptionRef} className="flex flex-col gap-4">
      <p className="text-lg md:text-xl font-semibold text-gray-900">{name}</p>
      <p className="text-sm md:text-base font-medium text-primary">{proprtyType}</p>
      <p className="text-sm md:text-base text-gray-700 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
