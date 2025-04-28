import React from "react";
import { useTranslation } from "react-i18next";
import {
  AirConditionIcon,
  AspectRatioImage,
  CarWindowIcon,
  GPSIcon,
  HStack,
  PersonGroupIcon,
  PriceDisplay,
  TransportLuggageIcon,
} from "@partials";
import { MarketServiceSearchHoverOverlay } from "../MarketServiceSearchCardHoverOverlay";
import { useRouter } from "next/router";

// Define an interface for the component props
interface MarketVehicleServiceSearchCardAltProps {
  id: string;
  pricePerDay: number;
  title: string;
  thumbnail: string;
  airCondition?: boolean;
  windows?: number;
  passengers?: number;
  gps?: boolean;
  luggage?: number;
}

export const MarketVehicleServiceSearchCardAlt: React.FC<
  MarketVehicleServiceSearchCardAltProps
> = ({
  id,
  pricePerDay,
  thumbnail,
  title,
  airCondition = true, // Default: vehicle has air conditioning
  gps = true, // Default: vehicle has GPS
  luggage = 0, // Default: no luggage space
  passengers = 0, // Default: no passenger capacity
  windows = 0, // Default: no windows
}) => {
    const router = useRouter();
  const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation(); // Localization hook

    return (
      <div className="flex flex-col gap-2 p-1">
        {/* Display the vehicle's thumbnail with a fixed aspect ratio */}

        <MarketServiceSearchHoverOverlay
          onButtonClick={() => router.push(`/service/vehicle/${id}`)}
        >
          <AspectRatioImage src={thumbnail} alt={title} ratio={1.05} />
        </MarketServiceSearchHoverOverlay>

        <div className="flex flex-col gap-2 ">
          {/* Display the vehicle's title */}
          <p className="text-lg font-semibold">{title}</p>

          {/* Display the daily price */}
          <div className="flex items-end text-lg text-green-600 font-medium gap-1 ">
            <PriceDisplay
              price={pricePerDay}
              className="text-green-600 text-lg"
            />{" "}
            <span className="text-xl font-bold"> | </span>
            {t("day")}
          </div>

          {/* Display vehicle features as icons with labels */}
          <HStack className="flex-wrap gap-1">
            {airCondition && (
              <div className="flex gap-0.5 items-center">
                <AirConditionIcon className="text-lg font-medium" />
                <p className=" mt-1">{t("A/C")}</p>
              </div>
            )}

            {gps && (
              <div className="flex gap-0.5 items-center">
                <GPSIcon className=" text-lg font-medium" />
                <p className=" mt-1">{t("GPS")}</p>
              </div>
            )}

            {passengers > 0 && (
              <div className="flex gap-0.5 items-center">
                <PersonGroupIcon className="text-lg font-medium" />
                <p className=" mt-1">{passengers}</p>
              </div>
            )}

            {luggage > 0 && (
              <div className="flex gap-0.5 items-center">
                <TransportLuggageIcon className=" text-lg font-medium" />
                <p className=" mt-1">{luggage}</p>
              </div>
            )}

            {windows > 0 && (
              <div className="flex gap-0.5 items-center">
                <CarWindowIcon className=" text-lg font-medium " />
                <p className=" mt-1">{windows}</p>
              </div>
            )}
          </HStack>
        </div>
      </div>
    );
  };
