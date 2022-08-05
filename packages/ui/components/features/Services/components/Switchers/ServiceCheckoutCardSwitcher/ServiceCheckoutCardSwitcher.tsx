import { ServiceCheckoutDataType } from "api";
import {
  HotelCheckoutCard,
  ResturantCheckoutCard,
  HealthCenterCheckoutCard,
  BeautyCenterCheckoutCard,
} from "ui";

export const ServiceCheckoutCardSwitcher: React.FC<{
  service: ServiceCheckoutDataType;
}> = ({ service: item }) => {
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
    default:
      return null;
  }
};
