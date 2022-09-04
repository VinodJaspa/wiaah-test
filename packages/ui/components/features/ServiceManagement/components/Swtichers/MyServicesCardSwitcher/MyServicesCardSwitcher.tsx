import { MyServiceData } from "api";
import React from "react";
import {
  HotelMyServiceCard,
  RestaurantMyServiceCard,
  HealthCenterMyServiceCard,
  BeautyCenterMyServiceCard,
  VehicleMyServiceCard,
  HolidayRentalsMyServiceCard,
} from "ui";

export interface MyServicesCardSwitcherProps {
  data: MyServiceData;
}

export const MyServicesCardSwitcher: React.FC<MyServicesCardSwitcherProps> = ({
  data,
}) => {
  if (!data) return null;
  const { type } = data;
  switch (type) {
    case "hotel":
      return <HotelMyServiceCard {...data} />;
    case "restaurant":
      return <RestaurantMyServiceCard {...data} />;
    case "holiday_rentals":
      return <HolidayRentalsMyServiceCard {...data} />;
    case "health_center":
      return <HealthCenterMyServiceCard {...data} />;
    case "vehicle":
      return <VehicleMyServiceCard {...data} />;
    case "beauty_center":
      return <BeautyCenterMyServiceCard {...data} />;
    default:
      return null;
  }
};
