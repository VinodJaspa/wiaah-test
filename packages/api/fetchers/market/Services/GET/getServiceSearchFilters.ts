import { FormatedSearchableFilter } from "src";

export type FilterType = "select" | "radio" | "check";
export type FilterDisplayType = "text" | "rate";

export type SearchFilterType =
  | {
      filterTitle: string;
      filterSlug: string;
      filterType: FilterType;
      filterDisplay: FilterDisplayType;
      filterOptions: {
        optName: string;
        optSlug: string;
      }[];
    }
  | {
      filterTitle: string;
      filterSlug: string;
      filterType: "range";
      minRange: number;
      maxRange: number;
    };

const filters: SearchFilterType[] = [
  {
    filterTitle: "Price range",
    filterSlug: "price_range",
    filterType: "range",
    maxRange: 10000,
    minRange: 10,
  },

  {
    filterTitle: "Property type",
    filterSlug: "property_type",
    filterType: "check",
    filterDisplay: "text",
    filterOptions: [
      {
        optName: "Hotel",
        optSlug: "hotel",
      },
      {
        optName: "House",
        optSlug: "house",
      },
      {
        optName: "Flat",
        optSlug: "flat",
      },
      {
        optName: "Guest house",
        optSlug: "guest_house",
      },
      {
        optName: "Hostel",
        optSlug: "hostel",
      },
    ],
  },
  {
    filterTitle: "Type of place",
    filterSlug: "type_of_place",
    filterType: "check",
    filterDisplay: "text",
    filterOptions: [
      {
        optName: "Private apartment",
        optSlug: "private_apartment",
      },
      {
        optName: "Private room",
        optSlug: "private_room",
      },
      {
        optName: "Shared room",
        optSlug: "shared_room",
      },
    ],
  },
  {
    filterTitle: "Number of rooms",
    filterSlug: "number_of_rooms",
    filterType: "check",
    filterDisplay: "text",
    filterOptions: [
      {
        optName: "1 room",
        optSlug: "1",
      },
      {
        optName: "2 rooms",
        optSlug: "2",
      },
      {
        optName: "3 rooms",
        optSlug: "3",
      },
      {
        optName: "4 rooms",
        optSlug: "4",
      },
      {
        optName: "5 rooms",
        optSlug: "5",
      },
    ],
  },
  {
    filterTitle: "Number of beds",
    filterSlug: "number_of_beds",
    filterType: "check",
    filterDisplay: "text",
    filterOptions: [
      {
        optName: "1 bed",
        optSlug: "1",
      },
      {
        optName: "2 beds",
        optSlug: "2",
      },
      {
        optName: "3 beds",
        optSlug: "3",
      },
      {
        optName: "4 beds",
        optSlug: "4",
      },
      {
        optName: "5 beds",
        optSlug: "5",
      },
    ],
  },
  {
    filterTitle: "Rating",
    filterSlug: "rating",
    filterDisplay: "rate",
    filterType: "check",
    filterOptions: [
      {
        optName: "1",
        optSlug: "1",
      },
      {
        optName: "2",
        optSlug: "2",
      },
      {
        optName: "3",
        optSlug: "3",
      },
      {
        optName: "4",
        optSlug: "4",
      },
      {
        optName: "5",
        optSlug: "5",
      },
    ],
  },
  {
    filterTitle: "Hotel class",
    filterSlug: "hotel_class",
    filterDisplay: "rate",
    filterType: "check",
    filterOptions: [
      {
        optName: "1",
        optSlug: "1",
      },
      {
        optName: "2",
        optSlug: "2",
      },
      {
        optName: "3",
        optSlug: "3",
      },
      {
        optName: "4",
        optSlug: "4",
      },
      {
        optName: "5",
        optSlug: "5",
      },
    ],
  },
  {
    filterTitle: "Service included",
    filterSlug: "service_included",
    filterType: "check",
    filterDisplay: "text",
    filterOptions: [],
  },
  {
    filterTitle: "Extra service",
    filterSlug: "extra_service",
    filterType: "check",
    filterDisplay: "text",
    filterOptions: [],
  },
];

export const getServiceSearchFiltersFetcher = async (
  filter?: FormatedSearchableFilter
): Promise<SearchFilterType[]> => {
  return filters;
};
