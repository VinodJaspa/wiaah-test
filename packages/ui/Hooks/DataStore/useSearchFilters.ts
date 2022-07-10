import { useRecoilState } from "recoil";
import { ServicesSearchFiltersState } from "state";

export const useSearchFilters = () => {
  const [filters, setFilters] = useRecoilState(ServicesSearchFiltersState);

  const getFiltersSearchQuery: string | null =
    typeof filters["search_query"] === "string"
      ? filters["search_query"]
      : null;

  return {
    filters,
    setFilters,
    getFiltersSearchQuery,
  };
};
