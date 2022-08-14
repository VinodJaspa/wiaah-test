import { SearchFilterType } from "./getServiceSearchFilters";

export async function getServicesSortingFilters(): Promise<SearchFilterType[]> {
  return [
    {
      filterTitle: "Sort By",
      filterType: "select",
      filterSlug: "sort_by",
      filterDisplay: "text",
      filterOptions: [
        {
          optName: "Our recommandations",
          optSlug: "our_recommandations",
        },
        {
          optName: "Rating & Recommended",
          optSlug: "rating_and_recommended",
        },
        {
          optName: "Price & Recommended",
          optSlug: "price_and_recommended",
        },
        {
          optName: "Distance & Recommended",
          optSlug: "distance_and_recommended",
        },
        {
          optName: "Rating only",
          optSlug: "rating_only",
        },
        {
          optName: "Price only",
          optSlug: "price_only",
        },
        {
          optName: "Distance only",
          optSlug: "distance_only",
        },
      ],
    },
  ];
}
