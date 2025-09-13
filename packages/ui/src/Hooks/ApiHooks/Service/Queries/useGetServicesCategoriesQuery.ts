import { ServiceType } from "@features/API";
import { QueryPaginationInputs } from "api";
import { useQuery } from "react-query";

// Helper to capitalize words
const capitalizeWords = (str: string) =>
  str.replace(/\b\w/g, (char) => char.toUpperCase());

export const useGetServicesCategoriesQuery = (
  pagination: QueryPaginationInputs
) => {
  return useQuery(["service_categories", { pagination }], () => {
    const res: Array<{ name: string; slug: ServiceType }> = [
      { name: "holidays rentals", slug: ServiceType.HolidayRentals },
      { name: "hotels", slug: ServiceType.Hotel },
      { name: "resturants", slug: ServiceType.Restaurant },
      { name: "health center", slug: ServiceType.HealthCenter },
      { name: "vehicle", slug: ServiceType.Vehicle },
      { name: "beauty center", slug: ServiceType.BeautyCenter },
      // { name: "shop", slug: ServiceType.Shop },
    ];

    // Capitalize category names
    return res.map((item) => ({
      ...item,
      name: capitalizeWords(item.name),
    }));
  });
};
