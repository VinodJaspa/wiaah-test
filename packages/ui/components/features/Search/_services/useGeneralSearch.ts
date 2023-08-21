import { Exact, SearchInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GeneralSearchQueryVariables = Exact<{
  args: SearchInput;
}>;

export type GeneralSearchQuery = {
  __typename?: "Query";
  generalSearch: Array<{
    __typename?: "Search";
    thumbnail?: string | null;
    title: string;
  }>;
};

type args = GeneralSearchQueryVariables["args"];

export const getGeneralSearchQueryKey = (args: args) => [
  "get-general-search-key",
  { args },
];

export const getGeneralSearchQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query GeneralSearch(
    $args:SearchInput!
){
    generalSearch(
        args:$args
    ){
        thumbnail
        title
    }
}
  `
    )
    .setVariables<GeneralSearchQueryVariables>({ args })
    .send<GeneralSearchQuery>();

  return res.data.generalSearch;
};

export const useGeneralSearch = (args: args) =>
  useQuery(getGeneralSearchQueryKey(args), () =>
    getGeneralSearchQueryFetcher(args)
  );
