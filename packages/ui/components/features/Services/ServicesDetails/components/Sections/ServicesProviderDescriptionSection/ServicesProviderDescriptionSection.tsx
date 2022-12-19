import React from "react";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";
import { HtmlSvgProps } from "types";
import { BedIcon, BathTubeIcon, CarIcon, PetPawIcon } from "@UI";
import { runIfFn } from "utils";
export interface ServicesProviderDescriptionSectionProps {
  description: string;
  bedrooms: number;
  bathrooms: number;
  cars: number;
  bikes: number;
  pets: number;
}

export const ServicesProviderDescriptionSection: React.FC<
  ServicesProviderDescriptionSectionProps
> = ({
  description,
  bathrooms = 0,
  bedrooms = 0,
  bikes = 0,
  cars = 0,
  pets = 0,
}) => {
  const descriptionRef = usePublishRef((keys) => keys.description);
  const { t } = useTranslation();
  const items: {
    text: string;
    icon: React.ReactNode;
  }[] = [
    {
      text: `${bedrooms} ${t("BedRooms")}`,
      icon: BedIcon,
    },
    {
      text: `${bathrooms} ${t("Bathrooms")}`,
      icon: BathTubeIcon,
    },
    {
      text: `${cars} ${t("Cards")}/${bikes} ${t("Bikes")}`,
      icon: CarIcon,
    },
    {
      text: `${pets} ${t("Pets Allowed")}`,
      icon: PetPawIcon,
    },
  ];

  return (
    <div ref={descriptionRef} className="flex flex-col gap-[1.875rem]">
      <p className="md:text-lg">{description}</p>
      <div
        style={{
          gridTemplateColumns:
            "repeat(auto-fit, minmax(3rem,calc(25% - 0.6rem)))",
        }}
        className="grid grid-cols-[] gap-3"
      >
        {items.map(({ icon, text }, i) => (
          <div
            className="flex rounded-lg bg-[#EFF0F2] text-darkBrown  flex-col gap-4 justify-center items-center h-[9.375rem] w-full"
            key={i}
          >
            {runIfFn<HtmlSvgProps>(icon, { className: "text-[2.125rem]" })}
            <p className="font-semibold">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
