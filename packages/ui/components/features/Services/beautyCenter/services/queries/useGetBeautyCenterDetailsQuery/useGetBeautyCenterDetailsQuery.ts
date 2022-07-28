import { getBeautyCenterDetailsDataFetcher } from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const getBeautyCenterDetailsDataQueryKey = (args: { id: string }) => [
  "beautyCenterDetailsData",
  args || {},
];

export const useGetBeautyCenterDetailsQuery = (
  id: string,
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getBeautyCenterDetailsDataFetcher>,
    any
  >
) => {
  return useQuery(
    getBeautyCenterDetailsDataQueryKey({ id }),
    () => getBeautyCenterDetailsDataFetcher(),
    options
  );
};
