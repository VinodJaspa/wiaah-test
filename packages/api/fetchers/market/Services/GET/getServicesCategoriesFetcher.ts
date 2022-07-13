import { ServicesType } from "types";

export const getServicesCategoriesFetcher = (
  take: number,
  page: number
): { name: string; slug: ServicesType }[] => {
  return [
    { name: "holidays rentals", slug: "holidays_rentals" },
    { name: "hotels", slug: "hotel" },
    { name: "resturants", slug: "resturant" },
  ];
};
