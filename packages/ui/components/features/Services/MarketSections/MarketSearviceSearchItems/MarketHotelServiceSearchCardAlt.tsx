import {
  AspectRatioImage,
  HeartOutlineAltIcon,
  HStack,
  PriceDisplay,
  StarIcon,
} from "@partials";
import { useTranslation } from "react-i18next";

export const MarketHotelServiceSearchCardAlt: React.FC<{
  thumbnail: string;
  name: string;
  rating: number;
  description: string;
  price: number;
  location: string;
}> = ({ description, location, name, price, rating, thumbnail }) => {
const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1 p-1">
      <AspectRatioImage
        className="rounded-xl"
        ratio={1.2}
        src={thumbnail}
        alt={name}
      >
        <button className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-black/30">
          <HeartOutlineAltIcon className="text-sm text-white fill-white" />
        </button>
      </AspectRatioImage>
      <div className="p-1 flex flex-col gap-8">
        <HStack className="justify-between">
          <p className="font-medium">{location}</p>
          <HStack className="text-xs">
            <StarIcon />
            <p>
              {rating}/{5}
            </p>
          </HStack>
        </HStack>
        <p className="text-grayText text-xs">{description}</p>
        <div className="flex items-end">
          <PriceDisplay
            price={price}
            className="mt-1"
            symbolProps={{ className: "text-primary" }}
          />
          /<span className="text-[0.625rem]">{t("Night")}</span>
        </div>
      </div>
    </div>
  );
};
