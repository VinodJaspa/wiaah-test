import React from "react";
import {
  AirConditionIcon,
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
} from "ui";
import { runIfFn } from "utils";
export const ServiceProperties = {
  "a/c": AirConditionIcon,
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
  free_wifi: WifiIcon,
  gym: DumbbellIcon,
  bar: BarGlassIcon,
  "24/7_front_desk": DeskIcon,
};
export const ServicePropertiesSwticher: React.FC<{ slug: string }> = ({
  slug,
}) => {
  const ServiceProperties = {
    "a/c": AirConditionIcon,
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
    free_wifi: WifiIcon,
    gym: DumbbellIcon,
    bar: BarGlassIcon,
    "24/7_front_desk": DeskIcon,
  };

  const Slug = slug as keyof typeof ServiceProperties;
  const icon = ServiceProperties[Slug];
  console.log(slug, AirConditionIcon);
  return (
    <>
      {icon
        ? runIfFn(icon)
        : runIfFn(SuccessIcon, {
            style: { color: "white", fill: "black", backgroundColor: "black" },
          })}
    </>
  );
};
