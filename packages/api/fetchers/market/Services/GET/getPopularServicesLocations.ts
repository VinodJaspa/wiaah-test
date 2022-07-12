import { FormatedSearchableFilter } from "src";

interface Location {
  name: string;
  location: string;
}

export const getPopularServiceLocations = async (
  take: number,
  page: number,
  searchQuery: string,
  filters?: FormatedSearchableFilter
): Promise<Location[]> => {
  const data = [
    {
      name: "orlando",
      location: "florida, United States",
    },
    {
      name: "Paris",
      location: "lle-de-france, France",
    },
    {
      name: "barcelona",
      location: "catalonia, spain",
    },
  ];
  return data;
};
