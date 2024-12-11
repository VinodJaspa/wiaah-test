import { AspectRatioImage, PriceDisplay, Rate } from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

interface SellerInfo {
  thumbnail: string;
  name: string;
  verified: boolean;
}

interface MarketHolidayRentalsProps {
  title: string;
  thumbnail: string;
  monthlyPrice: number;
  description: string;
  saved: boolean;
  seller: SellerInfo;
  rating: number;
  location: string;
  date: { from: string; to: string };
}
export const MarketHolidayRentalsServiceSearchCardAlt: React.FC<
  MarketHolidayRentalsProps
> = ({
  title,
  thumbnail,
  monthlyPrice,
  description,
  saved,
  rating,
  location,
  date,
}) => {
    const { t } = useTranslation();
    const [isSaved, setIsSaved] = React.useState(saved);
    const toggleSaved = () => {
      setIsSaved((prevState) => !prevState);
    };
    return (
      <div className="flex flex-col gap-1 p-1">
        <AspectRatioImage
          ratio={1.04}
          imageClassName="rounded-xl relative"
          src={thumbnail}
          alt={title}
        >
          <div
            className="absolute top-2 right-2 text-white flex justify-center items-center rounded-full p-1 bg-black bg-opacity-40"
            onClick={toggleSaved}
          >
            {isSaved ? (
              <IoIosHeart className="w-5 h-5 " />
            ) : (
              <IoIosHeartEmpty className="w-5 h-5" />
            )}
          </div>
        </AspectRatioImage>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between mt-2">
            <p className="font-semibold ">{location}</p>
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-2 items-center">
                <Rate rating={4} className="gap-1" starSize={18} />
                <p className="text-sm mt-1 font-medium">{rating}</p>
              </div>
            </div>
          </div>
          <div className="text-gray-500 flex gap-2 items-center">
            <span>{date.from}</span>
            <span>-</span>
            <span>{date.to}</span>
          </div>
          <p className="text-gray-500 font-medium">{description}</p>
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="flex items-start gap-1 text-lg font-semibold">
                <span>
                  <PriceDisplay
                    price={monthlyPrice}
                    className="text-lg font-semibold"
                  />
                </span>
                <span>total</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
