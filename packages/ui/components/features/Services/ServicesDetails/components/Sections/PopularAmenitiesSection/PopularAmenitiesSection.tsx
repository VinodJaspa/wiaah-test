import React from "react";
import { useTranslation } from "react-i18next";
import { HStack, ServicePropertiesSwticher } from "@UI";

export type amenite = {
  name: string;
  slug: string;
};

export interface PopularAmenitiesSectionProps {
  amenities: amenite[];
  cols?: number;
}

export const PopularAmenitiesSection: React.FC<
  PopularAmenitiesSectionProps
> = ({ amenities, cols = 1 }) => {
  const { t } = useTranslation();
  return (
    <section className="flex flex-col w-full gap-7">
      <p className="text-lg text-darkBrown md:text2xl font-bold leading-none">
        {t("Offered Amenities")}
      </p>
      <div
        style={{ gridTemplateColumns: `repeat(${cols},1fr)` }}
        className={`w-full grid gap-4 text-primary text-2xl thinScroll overflow-y-scroll`}
      >
        {amenities.map((amenite, i) => (
          <HStack key={i}>
            <ServicePropertiesSwticher slug={amenite.slug} />
            <p className="font-medium text-darkBrown text-base">
              {t(amenite.name)}
            </p>
          </HStack>
        ))}
      </div>
    </section>
  );
};
