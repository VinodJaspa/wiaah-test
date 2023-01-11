import { AsyncReturnType } from "types";
import {
  FormatedSearchableFilter,
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
    AsyncReturnType<typeof getVehicleServiceProviderDetailsFetcher>,
    any
  >
) => {
  return useQuery(
    getVehicleProviderDetailsQueryKey(filters),
    () => getVehicleServiceProviderDetailsFetcher(filters),
    options
  );
};
