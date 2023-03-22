import { ServiceCheckoutDataType } from "api";
import {
  HotelCheckoutCard,
  ResturantCheckoutCard,
  HealthCenterCheckoutCard,
  BeautyCenterCheckoutCard,
  ProductCheckoutCard,
} from "@UI";
import React from "react";
import { ServiceType } from "@features/API";

export interface ServiceCheckoutCardSwitcherProps {
  service: ServiceCheckoutDataType;
  passingProps?: any;
}

export const ServiceCheckoutCardSwitcher: React.FC<
  ServiceCheckoutCardSwitcherProps
> = ({ service: item, passingProps }) => {
  if (!item) return null;
  switch (item.type) {
    case ServiceType.Hotel:
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
      return "null" + item.type;
  }
};
