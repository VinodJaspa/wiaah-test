import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  AspectRatioImage,
  Rate,
  ServicesRequestKeys,
  Button,
  BeautyCenterTreatment,
  BeautyCenter,
} from "@UI";
import { SeperatedStringArray } from "utils";

export interface BeautyCenterRecommendedSearchCardProps {
  treatment: {
    title: string;
    price: number;
    duration: number;
    id: string;
    category: string;
    thumbnail: string;
    rate: number;
    reviews: number;
  };
}

export const BeautyCenterRecommendedSearchCard: React.FC<
  BeautyCenterRecommendedSearchCardProps
> = ({ treatment }) => {
  const { visit } = useRouting();

const { t } = useTranslation();

  if (!treatment) return null;

  return (
    <div className="flex flex-col shadow">
      <AspectRatioImage
        className="group"
        src={treatment.thumbnail}
        alt={treatment.title}
        ratio={3 / 4}
      >
        <div
          className={
            "bg-black bg-opacity-0 transition-all opacity-0 pointer-events-none group-hover:opacity-100 group-hover:bg-opacity-25 group-hover:pointer-events-auto top-0 left-0 w-full h-full absolute flex justify-center items-center"
          }
        >
          <Button
            onClick={() =>
              visit((routes) =>
                routes.visitService(
                  treatment,
                  ServicesRequestKeys.beauty_center
                )
              )
            }
          >
            {t("Details")}
          </Button>
        </div>
      </AspectRatioImage>
      <div className="px-2 py-4 flex flex-col gap-2">
        <p className="font-bold">{treatment.title}</p>
        <p className="">{treatment.category}</p>
        <div className="flex gap-4">
          <Rate rating={treatment.rate} />
          <p>
            {treatment.reviews} {t("review")}
          </p>
        </div>
        <div className="flex gap-4">
          <p>{SeperatedStringArray([], ", ")}</p>
          <p
            onClick={() =>
              visit((routes) =>
                routes.visitServiceOnMap(
                  treatment,
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
