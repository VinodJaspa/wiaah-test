import {
  FormatedSearchableFilter,
  PaginationFetchedData,
  QueryPaginationInputs,
  getVehicleSearchPickupLocationsFetcher,
  VehiclePickUpLocationResponseData,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetVehiclePickUpLocationQuery = (
  pagination: QueryPaginationInputs,
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    VehiclePickUpLocationResponseData,
    any
  >
) => {
  return useQuery(
    ["vehiclePickupLocations", { pagination }],
    () => getVehicleSearchPickupLocationsFetcher(pagination, filters),
    options
  );
};
