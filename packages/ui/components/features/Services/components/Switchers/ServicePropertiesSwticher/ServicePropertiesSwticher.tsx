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

export const ServicePropertiesSwticher: React.FC<{ slug: string }> = ({
  slug,
}) => {
  switch (slug) {
    case "a/c":
      return <AirConditionIcon />;
    case "gps":
      return <GPSIcon />;
    case "passengers":
      return <TransportGuestsIcon />;
    case "windows":
      return <CarWindowIcon />;
    case "bags":
      return <TransportLuggageIcon />;
    case "pool":
      return <PoolIcon />;
    case "resturant":
      return <SpoonCrossKnifeIcon />;
    case "parking":
      return <ParkingIcon />;
    case "business_services":
      return <BusinessServiceIcon />;
    case "room_service":
      return <DiningBellIcon />;
    case "pet-friendly":
      return <PetPawIcon />;
    case "breakfast":
      return <CupIcon />;
    case "laundry":
      return <LaundryIcon />;
    case "free_wifi":
      return <WifiIcon />;
    case "gym":
      return <DumbbellIcon />;
    case "bar":
      return <BarGlassIcon />;
    case "24/7_front_desk":
      return <DeskIcon />;
    default:
      return <SuccessIcon className="bg-black" />;
  }
};
