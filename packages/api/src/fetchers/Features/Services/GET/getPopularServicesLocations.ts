import { FormatedSearchableFilter, QueryPaginationInputs, Location } from "api";
import { AsyncReturnType } from "types";

export const getPopularServiceLocations = async (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter,
  searchQuery: string
): Promise<Location[]> => {
  const data: AsyncReturnType<typeof getPopularServiceLocations> = [
    {
      address: "address 1",
      city: "Paris",
      cords: {
        lat: 15,
        lng: 54,
      },
      country: "france",
      countryCode: "FC",
      postalCode: 1354,
      state: "Geneve",
    },
    {
      address: "address 1",
      city: "Paris",
      cords: {
        lat: 15,
        lng: 54,
      },
      country: "france",
      countryCode: "FC",
      postalCode: 1354,
      state: "Geneve",
    },
    {
      address: "address 1",
      city: "Paris",
      cords: {
        lat: 15,
        lng: 54,
      },
      country: "france",
      countryCode: "FC",
      postalCode: 1354,
      state: "Geneve",
    },
  ];
  return data;
};
