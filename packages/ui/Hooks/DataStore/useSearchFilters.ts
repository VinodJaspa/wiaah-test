import { SearchFilterValue } from "api";
import { useRecoilState } from "recoil";
import { ServicesSearchFiltersState } from "state";

export const useSearchFilters = () => {
  const [filters, setFilters] = useRecoilState(ServicesSearchFiltersState);

  const getFiltersSearchQuery: string | null =
    typeof filters["search_query"] === "string"
      ? filters["search_query"]
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
