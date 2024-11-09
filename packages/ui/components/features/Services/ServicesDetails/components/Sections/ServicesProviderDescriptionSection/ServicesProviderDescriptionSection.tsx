import { Maybe, ServiceAmenity } from "@features/API";
import { BathTubeIcon, BedIcon, CarIcon, PetPawIcon } from "@partials";
import { HtmlSvgProps } from "@UI/../types/src";
import { runIfFn } from "@UI/../utils/src";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";
import { PopularAmenitiesSection } from "../PopularAmenitiesSection";
export interface ServicesProviderDescriptionSectionProps {
  description: string;
  bedRooms?: number;
  bathRooms?: number;
  petAllowed?: boolean;
  amenities?: Maybe<
    Array<
      { __typename?: "ServiceAmenity" } & Pick<
        ServiceAmenity,
        "label" | "value"
      >
    >
  >;
}

export const ServicesProviderDescriptionSection: React.FC<
  ServicesProviderDescriptionSectionProps
> = ({ description, amenities, bedRooms, bathRooms, petAllowed }) => {
  const descriptionRef = usePublishRef((keys) => keys.description);
  const { t } = useTranslation();
  const items: {
    text: string;
    icon: React.ReactNode;
  }[] = [
      {
        text: `${3} ${t("BedRooms")}`,
        icon: <BedIcon />,
      },
      {
        text: `${1} ${t("Bathrooms")}`,
        icon: <BathTubeIcon />,
      },
      // {
      //   text: `${4} ${t("Cards")}/${2} ${t("Bikes")}`,
      //   icon: <CarIcon />,
      // },
      {
        text: ` ${t("Pets Allowed")}`,
        icon: <PetPawIcon />,
      },
    ];

  return (
    <div ref={descriptionRef} className="flex flex-col gap-[1.875rem]">
      <p className="md:text-lg">{description}</p>
      <div
        // style={{
        //   gridTemplateColumns:
        //     "repeat(auto-fit, minmax(3rem,calc(25% - 0.6rem)))",
        // }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {items.map(({ icon, text }, i) => (
          <div
            className="flex rounded-lg bg-[#EFF0F2] text-darkBrown flex-col gap-4 justify-center items-center h-[9.375rem] w-full"
            key={i}
          >
            {runIfFn<HtmlSvgProps>(icon, { className: "text-[2.125rem]" })}
            <p className="font-semibold">{text}</p>
          </div>
        ))}
      </div>

      <PopularAmenitiesSection
        amenities={amenities.map((amenity) => amenity.label)}
      />
    </div>
  );
};
