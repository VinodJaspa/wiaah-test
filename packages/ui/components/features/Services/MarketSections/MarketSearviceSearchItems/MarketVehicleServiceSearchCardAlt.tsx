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
} from "@UI";

import { useRouter } from "next/router";
import { MarketServiceSearchHoverOverlay } from "@features/index";

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
  const { t } = useTranslation(); // Localization hook

    return (
      <div className="flex flex-col gap-2 p-1">
       
       OKKKK
      </div>
    );
  };
