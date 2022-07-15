import { FormatedSearchableFilter, QueryPaginationInputs } from "api";
import { useQuery } from "react-query";

export const useGetHealthCenterPractitionersQuery = (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter
) => {
  return useQuery([""]);
};
