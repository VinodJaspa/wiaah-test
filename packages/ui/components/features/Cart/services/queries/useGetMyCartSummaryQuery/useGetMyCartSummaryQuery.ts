import { getMyCartSummaryDataFetcher } from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const getMySummaryCartdataQueryKey = () => ["myCartSummary"];
export const useGetMyCartSummaryDataQuery = (
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getMyCartSummaryDataFetcher>,
    any
  >
) => {
  return useQuery(
    getMySummaryCartdataQueryKey(),
    () => getMyCartSummaryDataFetcher(),
    options
  );
};
