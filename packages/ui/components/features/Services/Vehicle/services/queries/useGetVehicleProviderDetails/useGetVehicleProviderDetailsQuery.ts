import {
  FormatedSearchableFilter,
  GetVehicleServiceProviderDetailsApiResponse,
  getVehicleServiceProviderDetailsFetcher,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";

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
    ["vehicleServiceProviderDetails", { filters }],
    () => getVehicleServiceProviderDetailsFetcher(filters),
    options
  );
};
