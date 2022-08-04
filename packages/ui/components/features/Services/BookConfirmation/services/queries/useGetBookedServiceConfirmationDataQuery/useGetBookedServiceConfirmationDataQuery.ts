import { getBookedSerivceConfirmationDataFetcher } from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const getBookedServiceConfirmationQueryKey = (id: string) => [
  "BookedServiceConfirmation",
  { id },
];
export const useGetBookedServiceConfirmationDataQuery = (
  id: string,
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getBookedSerivceConfirmationDataFetcher>,
    any
  >
) => {
  return useQuery(
    getBookedServiceConfirmationQueryKey(id),
    () => getBookedSerivceConfirmationDataFetcher(id),
    options
  );
};
