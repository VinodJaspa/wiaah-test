import { QueryPaginationInputs } from "../../../../";
import { ServicesType } from "types";

export type ServiceCategoryType = { name: string; slug: ServicesType };

export const getServicesCategoriesFetcher = (
  pagination: QueryPaginationInputs
): ServiceCategoryType[] => {
  return [
    { name: "holidays rentals", slug: "holidays_rentals" },
    { name: "hotels", slug: "hotel" },
    { name: "resturants", slug: "resturant" },
  ];
};
