import React from "react";
import { useTranslation } from "react-i18next";
import { HStack, ServicePropertiesSwticher } from "ui";

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
    <section className="flex flex-col gap-4">
      <p className="text-lg md:text2xl font-bold leading-none">
        {t("Common amenities")}
      </p>
      <div
        style={{ gridTemplateColumns: `repeat(${cols},1fr)` }}
        className={`w-full grid gap-4 thinScroll max-h-[16rem] overflow-y-scroll`}
      >
        {amenities.map((amenite, i) => (
          <HStack key={i}>
            <ServicePropertiesSwticher slug={amenite.slug} />
            <p>{t(amenite.name)}</p>
          </HStack>
        ))}
      </div>
    </section>
  );
};
