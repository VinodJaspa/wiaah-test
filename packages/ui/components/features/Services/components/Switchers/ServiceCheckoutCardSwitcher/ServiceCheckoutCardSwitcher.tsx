import { ServiceCheckoutDataType } from "api";
import {
  HotelCheckoutCard,
  ResturantCheckoutCard,
  HealthCenterCheckoutCard,
  BeautyCenterCheckoutCard,
  ProductCheckoutCard,
} from "ui";
import React from "react";

export interface ServiceCheckoutCardSwitcherProps {
  service: ServiceCheckoutDataType;
}

export const ServiceCheckoutCardSwitcher: React.FC<
  ServiceCheckoutCardSwitcherProps
> = ({ service: item }) => {
  if (!item) return null;
  switch (item.type) {
    case "hotel":
      return <HotelCheckoutCard {...item.data} />;
    case "resturant":
      return <ResturantCheckoutCard {...item.data} />;
    case "health_center":
      return <HealthCenterCheckoutCard {...item.data} />;
    case "beauty_center":
      return <BeautyCenterCheckoutCard {...item.data} />;
    case "product":
      return <ProductCheckoutCard {...item.data} />;
    default:
      return null;
  }
};
