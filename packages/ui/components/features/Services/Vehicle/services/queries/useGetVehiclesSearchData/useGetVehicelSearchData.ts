import {
  FormatedSearchableFilter,
  QueryPaginationInputs,
  getVehicleSearchDataFetcher,
  VehicleSearchDataApiResponse,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetVehicleSearchDataQuery = (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    VehicleSearchDataApiResponse,
    any
  >,
) => {
  return useQuery(
    ["vehicleSearchQuery", { pagination, filters }],
    () => getVehicleSearchDataFetcher(pagination, filters),
    options,
  );
};
