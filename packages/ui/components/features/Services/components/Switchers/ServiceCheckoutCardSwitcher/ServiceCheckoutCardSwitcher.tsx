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
  passingProps?: any;
}

export const ServiceCheckoutCardSwitcher: React.FC<
  ServiceCheckoutCardSwitcherProps
> = ({ service: item, passingProps }) => {
  if (!item) return null;
  switch (item.type) {
    case "hotel":
      return <HotelCheckoutCard {...passingProps} {...item.data} />;
    case "resturant":
      return <ResturantCheckoutCard {...passingProps} {...item.data} />;
    case "health_center":
      return <HealthCenterCheckoutCard {...passingProps} {...item.data} />;
    case "beauty_center":
      return <BeautyCenterCheckoutCard {...passingProps} {...item.data} />;
    case "product":
      return <ProductCheckoutCard {...passingProps} {...item.data} />;
    default:
      return null;
  }
};
