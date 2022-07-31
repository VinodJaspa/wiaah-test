import { RecommendedBeautyCenterDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { AspectRatioImage, Rate, ServicesRequestKeys, Button } from "ui";
import { SeperatedStringArray } from "utils";

export interface BeautyCenterRecommendedSearchCardProps
  extends RecommendedBeautyCenterDataType {}

export const BeautyCenterRecommendedSearchCard: React.FC<
  BeautyCenterRecommendedSearchCardProps
> = (props) => {
  const { name, owners, rate, reviews, thumbnail } = props;

  const { visit } = useRouting();

  const { t } = useTranslation();
  return (
    <div className="flex flex-col shadow gap-2">
      <AspectRatioImage
        className="group"
        src={thumbnail}
        alt={name}
        ratio={3 / 5}
      >
        <div
          className={
            "bg-black bg-opacity-0 transition-all opacity-0 pointer-events-none group-hover:opacity-100 group-hover:bg-opacity-25 group-hover:pointer-events-auto top-0 left-0 w-full h-full absolute flex justify-center items-center"
          }
        >
          <Button
            onClick={() =>
              visit((routes) =>
                routes.visitService(props, ServicesRequestKeys.beauty_center)
              )
            }
          >
            {t("Details")}
          </Button>
        </div>
      </AspectRatioImage>
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
          <p
            onClick={() =>
              visit((routes) =>
                routes.visitServiceOnMap(
                  props,
                  ServicesRequestKeys.beauty_center
                )
              )
            }
            className="cursor-pointer text-primary"
          >
            {t("Show on map")}
          </p>
        </div>
      </div>
    </div>
  );
};
