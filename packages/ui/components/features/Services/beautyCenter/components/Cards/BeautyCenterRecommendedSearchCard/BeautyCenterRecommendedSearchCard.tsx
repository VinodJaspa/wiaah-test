import { RecommendedBeautyCenterDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { AspectRatioImage, Rate } from "ui";
import { SeperatedStringArray } from "utils";

export interface BeautyCenterRecommendedSearchCardProps
  extends RecommendedBeautyCenterDataType {}

export const BeautyCenterRecommendedSearchCard: React.FC<
  BeautyCenterRecommendedSearchCardProps
> = ({ name, owners, rate, reviews, thumbnail }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col shadow gap-2">
      <AspectRatioImage src={thumbnail} alt={name} ratio={3 / 5} />
      <div className="p-2 flex flex-col gap-2">
        <p className="font-bold">{name}</p>
        <div className="flex gap-4">
          <Rate rating={rate} />
          <p>
            {reviews} {t("reviews")}
          </p>
        </div>
        <div className="flex gap-4">
          <p>{SeperatedStringArray(owners, ", ")}</p>
          <p className="cursor-pointer text-primary">{t("Show on map")}</p>
        </div>
      </div>
    </div>
  );
};
