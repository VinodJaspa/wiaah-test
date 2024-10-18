import React from "react";
import {
  CarWindowIcon,
  GPSIcon,
  TransportGuestsIcon,
  TransportLuggageIcon,
  SuccessIcon,
  PoolIcon,
  SpoonCrossKnifeIcon,
  BusinessServiceIcon,
  DiningBellIcon,
  PetPawIcon,
  CupIcon,
  LaundryIcon,
  WifiIcon,
  DumbbellIcon,
  BarGlassIcon,
  DeskIcon,
  ParkingIcon,
  ForkAndKnifeIcon,
  TelevisionIcon,
  SnowFlakeIcon,
  BalconyIcon,
} from "@UI";
import { runIfFn } from "utils";

// Define a common interface for all icon components
interface CommonIconProps {
  style?: React.CSSProperties;
}

type IconComponent = React.ComponentType<CommonIconProps>;

export const ServiceProperties: Record<string, IconComponent> = {
  "a/c": SnowFlakeIcon,
  gps: GPSIcon,
  passengers: TransportGuestsIcon,
  windows: CarWindowIcon,
  bags: TransportLuggageIcon,
  pool: PoolIcon,
  restaurant: SpoonCrossKnifeIcon,
  parking: ParkingIcon,
  business_services: BusinessServiceIcon,
  room_service: DiningBellIcon,
  "pet-friendly": PetPawIcon,
  breakfast: CupIcon,
  laundry: LaundryIcon,
  wifi: WifiIcon,
  gym: DumbbellIcon,
  bar: BarGlassIcon,
  "24/7_front_desk": DeskIcon,
  kitchen: ForkAndKnifeIcon,
  balcony: BalconyIcon,
  tv: TelevisionIcon,
};

export interface ServicePropertiesSwitcherProps {
  slug: string;
}

export const ServicePropertiesSwticher: React.FC<
  ServicePropertiesSwitcherProps
> = ({ slug }) => {
  const Icon = ServiceProperties[slug] || SuccessIcon;

  return (
    <Icon
      style={
        Icon === SuccessIcon
          ? { color: "white", fill: "black", backgroundColor: "black" }
          : undefined
      }
    />
  );
};
