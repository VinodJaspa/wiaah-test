import React from "react";
import { useTranslation } from "react-i18next";
import { AspectRatioImage, HStack, Rate } from "@partials";
import { MarketServiceSearchHoverOverlay } from "../MarketServiceSearchCardHoverOverlay";
import { useRouter } from "next/router";

interface MarketBeautyCenterSearchCardAltProps {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  rate: number;
  reviews: number;
  name: string;
}

export const MarketBeautyCenterSearchCardAlt: React.FC<
  MarketBeautyCenterSearchCardAltProps
> = ({ category, id, rate, reviews, thumbnail, title, name }) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1 p-1 shadow-md">
      {/* Image section with an aspect ratio */}
      <MarketServiceSearchHoverOverlay
        onButtonClick={() => router.push(`/service/beauty_center/${id}`)}
      >
        <AspectRatioImage
          className="rounded-md"
          alt={title}
          ratio={0.7}
          src={thumbnail}
        />
      </MarketServiceSearchHoverOverlay>

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
