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
  TransportGuestsIconProps,
} from "@UI";
import { runIfFn } from "utils";
import { IconBaseProps } from "react-icons";
import { HtmlSvgProps } from "types";
type IconProps = HtmlSvgProps | IconBaseProps | TransportGuestsIconProps;

export const ServiceProperties: Record<string, React.FC<any>> = {
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

export const ServicePropertiesSwticher: React.FC<{ slug: string }> = ({
  slug,
}) => {
  const Slug = slug as keyof typeof ServiceProperties;
  const icon = ServiceProperties[Slug];
  return (
    <>
      {icon
        ? runIfFn(icon as React.FC<IconProps>)
        : runIfFn(SuccessIcon, {
          style: { color: "white", fill: "black", backgroundColor: "black" },
        })}
    </>
  );
};
