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
});

export const SERVICESTYPE_INDEXKEY = "service_type";
