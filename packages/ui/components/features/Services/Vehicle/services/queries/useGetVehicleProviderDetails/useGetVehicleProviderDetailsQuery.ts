import {
  FormatedSearchableFilter,
  GetVehicleServiceProviderDetailsApiResponse,
  getVehicleServiceProviderDetailsFetcher,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const getVehicleProviderDetailsQueryKey = (
  filters: FormatedSearchableFilter
) => ["vehicleServiceProviderDetails", { filters }];

export const useGetVehicleProviderDetailsQuery = (
  filters: FormatedSearchableFilter,
  options?: UseQueryOptions<
    unknown,
    unknown,
    GetVehicleServiceProviderDetailsApiResponse,
    any
  >
) => {
  return useQuery(
    getVehicleProviderDetailsQueryKey(filters),
    () => getVehicleServiceProviderDetailsFetcher(filters),
    options
  );
};
