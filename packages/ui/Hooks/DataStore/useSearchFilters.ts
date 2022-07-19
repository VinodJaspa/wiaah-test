import { SearchFilterValue } from "api";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ServicesSearchFiltersState } from "state";
import { filtersTokens } from "../../constants";

export const useSearchFilters = () => {
  const [filters, setFilters] = useRecoilState(ServicesSearchFiltersState);

  const getFiltersSearchQuery: string | null =
    typeof filters[filtersTokens.searchQuery] === "string"
      ? (filters[filtersTokens.searchQuery] as string)
      : null;

  const addFilter = (filter: [string, SearchFilterValue]) => {
    setFilters((state) => {
      return { ...state, [filter[0]]: filter[1] };
    });
  };

  return {
    filters,
    setFilters,
    addFilter,
    getFiltersSearchQuery,
  };
};

export const useMutateSearchFilters = () => {
  const setFilters = useSetRecoilState(ServicesSearchFiltersState);

  const addFilter = (filter: [string, SearchFilterValue]) => {
    setFilters((state) => {
      return { ...state, [filter[0]]: filter[1] };
    });
  };

  return { addFilter };
};
