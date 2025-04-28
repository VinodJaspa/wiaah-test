import { AspectRatioImage, PriceDisplay, Rate } from "@partials";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { MarketServiceSearchHoverOverlay } from "../MarketServiceSearchCardHoverOverlay";

// Interface for seller information
interface SellerInfo {
  thumbnail: string;
  name: string;
  verified: boolean;
}

// Props for the holiday rentals card component
interface MarketHolidayRentalsProps {
  id: string;
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

// Functional component to display a holiday rental card
export const MarketHolidayRentalsServiceSearchCardAlt: React.FC<
  MarketHolidayRentalsProps
> = ({
  id,
  title,
  thumbnail,
  monthlyPrice,
  description,
  saved,
  rating,
  location,
  date,
}) => {
    const router = useRouter();
  const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation(); // Translation hook for localization

    // State to manage whether the rental is saved
    const [isSaved, setIsSaved] = React.useState(saved);

    // Toggles the "saved" state
    const toggleSaved = () => {
      setIsSaved((prevState) => !prevState);
    };

    return (
      <div className="flex flex-col gap-1 p-1">
        {/* Image with aspect ratio and save toggle button */}
        <div className="relative">
          <MarketServiceSearchHoverOverlay
            onButtonClick={() => router.push(`/service/holiday_rentals/${id}`)}
          >
            <AspectRatioImage
              ratio={1.04}
              imageClassName="rounded-xl relative"
              src={thumbnail}
              alt={title}
            ></AspectRatioImage>
          </MarketServiceSearchHoverOverlay>

          <div
            className="absolute top-2 right-2 text-white flex justify-center items-center rounded-full p-1 bg-black bg-opacity-40 cursor-pointer z-30"
            onClick={(e) => {
              e.stopPropagation();
              toggleSaved();
            }}
          >
            {isSaved ? (
              <IoIosHeart className="w-5 h-5" />
            ) : (
              <IoIosHeartEmpty className="w-5 h-5" />
            )}
          </div>
        </div>

        {/* Rental details section */}
        <div className="flex flex-col gap-2">
          {/* Location and rating */}
          <div className="flex justify-between mt-2">
            <p className="font-semibold">{location}</p>
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-2 items-center">
                <Rate rating={rating} className="gap-1" starSize={18} />
                <p className="text-sm mt-1 font-medium">{rating}</p>
              </div>
            </div>
          </div>

          {/* Availability dates */}
          <div className="text-gray-500 flex gap-2 items-center">
            <span>{date.from}</span>
            <span>-</span>
            <span>{date.to}</span>
          </div>

          {/* Description */}
          <p className="text-gray-500 font-medium">{description}</p>

          {/* Pricing section */}
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="flex items-start gap-1 text-lg font-semibold">
                <span>
                  <PriceDisplay
                    price={monthlyPrice}
                    className="text-lg font-semibold"
                  />
                </span>
                <span>{t("total")}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
