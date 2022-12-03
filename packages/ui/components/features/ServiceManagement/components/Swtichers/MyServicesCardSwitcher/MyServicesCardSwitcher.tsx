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
  onEdit: () => any;
  onRemove: () => any;
}

export const MyServicesCardSwitcher: React.FC<MyServicesCardSwitcherProps> = ({
  data,
  ...props
}) => {
  if (!data) return null;
  const { type } = data;
  switch (type) {
    case "hotel":
      return <HotelMyServiceCard {...props} {...data} />;
    case "restaurant":
      return <RestaurantMyServiceCard {...props} {...data} />;
    case "holiday_rentals":
      return <HolidayRentalsMyServiceCard {...props} {...data} />;
    case "health_center":
      return <HealthCenterMyServiceCard {...props} {...data} />;
    case "vehicle":
      return <VehicleMyServiceCard {...props} {...data} />;
    case "beauty_center":
      return <BeautyCenterMyServiceCard {...props} {...data} />;
    default:
      return null;
  }
};
