import { FormatedSearchableFilter, SearchFilterValue } from "api";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ServicesSearchFiltersState } from "state";
import { filtersTokens } from "../../constants";

const filtersKeys = {
  propertyName: "propertyName",
  searchQuery: "searchQuery",
  location: "location",
  serviceType: "serviceType",
} as const;

export const useSearchFilters = () => {
  const filters = useRecoilValue(ServicesSearchFiltersState);

  const getFiltersSearchQuery: string | null =
    typeof filters[filtersTokens.searchQuery] === "string"
      ? (filters[filtersTokens.searchQuery] as string)
      : null;

  const getLocationFilterQuery: string | null =
    typeof filters[filtersTokens.locationSearchQuery] === "string"
      ? (filters[filtersTokens.locationSearchQuery] as string)
      : null;

  const getServiceType: string | null =
    typeof filters[filtersTokens.serviceType] === "string"
      ? (filters[filtersTokens.serviceType] as string)
      : null;

  function getFilter(
    filter: (key: typeof filtersKeys) => keyof typeof filtersKeys
  ): SearchFilterValue | null {
    const key = filter(filtersKeys);
    return filters[key] ?? null;
  }

  return {
    filters,
    getFilter,
    getFiltersSearchQuery,
    getServiceType,
    getLocationFilterQuery,
    filtersKeys,
  };
};

export const useMutateSearchFilters = () => {
  const setFilters = useSetRecoilState(ServicesSearchFiltersState);

  const addFilter = (
    filter:
      | [string, SearchFilterValue]
      | ((keys: typeof filtersKeys) => [keyof typeof filtersKeys, any])
  ) => {
    if (typeof filter === "function") {
      const [key, value] = filter(filtersKeys);
      setFilters((state) => {
        return { ...state, [key]: value };
      });
    } else {
      setFilters((state) => {
        return { ...state, [filter[0]]: filter[1] };
      });
    }
  };

  return { addFilter, setFilters, filtersKeys };
};
