import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { AspectRatioImage, HStack, Rate } from "@partials";
import { MarkdetServiceSearchHoverOverlay } from "../MarketServiceSearchCardHoverOverlay";

interface MarketBeautyCenterSearchCardAltProps {
  title: string;
  thumbnail: string;
  category: string;
  rate: number;
  reviews: number;
  id: string;
  name: string;
}

export const MarketBeautyCenterSearchCardAlt: React.FC<
  MarketBeautyCenterSearchCardAltProps
> = ({ category, id, rate, reviews, thumbnail, title, name }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1 p-1 shadow-md">
      {/* Image section with an aspect ratio */}
      <MarkdetServiceSearchHoverOverlay>
        <AspectRatioImage
          className="rounded-md"
          alt={title}
          ratio={0.7}
          src={thumbnail}
        />
      </MarkdetServiceSearchHoverOverlay>

      {/* Content section */}
      <div className="p-1 flex flex-col gap-3">
        {/* Title */}
        <p className="font-semibold">{title}</p>

        {/* Rating and reviews */}
        <div className="flex gap-4 items-center ">
          <Rate rating={rate} className="gap-1" starSize={16} />
          <p>{`(${reviews}) ${t("Reviews")}`}</p>
        </div>

        {/* Show on map button */}

        <HStack>
          <p>{name}</p>
          <p className="text-primary">{t("Show on map")}</p>
        </HStack>
      </div>
    </div>
  );
};
