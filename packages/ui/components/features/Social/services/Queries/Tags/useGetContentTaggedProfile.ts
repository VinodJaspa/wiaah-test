import { createGraphqlRequestClient } from "@UI/../api";
import { UseQueryOptions, useQuery } from "react-query";

type args = {};

export const getContentTaggedProfilesQueryKey = (args: args) => [
  "content-tagged-profiles",
  { args },
];

export const getContentTaggedProfilesQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client.setQuery(``).setVariables<>().send<>();

  return res.data;
};

export const useGetContentTaggedProfilesQuery = (
  args: args,
  options?: UseQueryOptions<any, any, args, any>
) =>
  useQuery(
    getContentTaggedProfilesQueryKey(args),
    () => getContentTaggedProfilesQueryFetcher(args),
    options
  );
