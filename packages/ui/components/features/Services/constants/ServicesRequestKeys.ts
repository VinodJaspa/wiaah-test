import { ServicesType } from "types";

function createServiceRequestKeys<T extends { [name: string]: ServicesType }>(
  cfg: T
) {
  return cfg;
}

export const ServicesRequestKeys = createServiceRequestKeys({
  hotels: "hotel",
  resturants: "resturant",
  holidaysRentals: "holidays_rentals",
  healthCenter: "health_center",
  general: "general",
  vehicle: "vehicle",
  beauty_center: "beauty_center",
});

export const SERVICESTYPE_INDEXKEY = "serviceType";
