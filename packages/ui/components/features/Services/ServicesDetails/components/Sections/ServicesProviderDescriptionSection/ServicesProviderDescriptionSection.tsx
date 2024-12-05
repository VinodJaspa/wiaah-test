import React from "react";
import { useTranslation } from "react-i18next";
import { Maybe, ServiceAmenity } from "@features/API";
import { BathTubeIcon, BedIcon, PetPawIcon } from "@partials";
import { runIfFn } from "@UI/../utils/src";
import { HtmlSvgProps } from "@UI/../types/src";
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

  const items = [
    bedRooms && {
      text: `${bedRooms} ${t("BedRooms")}`,
      icon: <BedIcon />,
    },
    bathRooms && {
      text: `${bathRooms} ${t("Bathrooms")}`,
      icon: <BathTubeIcon />,
    },
    petAllowed && {
      text: t("Pets Allowed"),
      icon: <PetPawIcon />,
    },
  ].filter(Boolean); // Filters out undefined/null entries.

  return (
    <div ref={descriptionRef} className="flex flex-col gap-[1.875rem]">
      <p className="md:text-lg">{description}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map(({ icon, text }, index) => (
          <div
            className="flex rounded-lg bg-[#EFF0F2] text-darkBrown flex-col gap-4 justify-center items-center h-[9.375rem] w-full"
            key={index}
          >
            {runIfFn<HtmlSvgProps>(icon, { className: "text-[2.125rem]" })}
            <p className="font-semibold">{text}</p>
          </div>
        ))}
      </div>
      {amenities && (
        <PopularAmenitiesSection
          amenities={amenities?.map((amenity) => amenity.label).filter(Boolean)}
        />
      )}
    </div>
  );
};
