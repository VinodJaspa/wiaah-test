import { Exact } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetBestShopsQueryVariables = Exact<{
  take: number;
}>;

export type GetBestShopsQuery = {
  __typename?: "Query";
  getTopShops: Array<{
    __typename?: "Shop";
    name: string;
    id: string;
    storeCategory: string;
    ownerId: string;
    thumbnail: string;
  }>;
};

type args = GetBestShopsQueryVariables;
export const getBestShopsQueryKey = (args: args) => ["best-shops", { args }];

export const getBestShopsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getBestShops($take:Int!) {
    getTopShops(
        take:$take
    ){
        name
        id
        storeCategory
        ownerId
        name
        thumbnail
    }
}
    `
    )
    .setVariables<GetBestShopsQueryVariables>(args)
    .send<GetBestShopsQuery>();

  return res.data.getTopShops;
};

export const useGetBestShopsQuery = (args: args) =>
  useQuery(getBestShopsQueryKey(args), () => getBestShopsQueryFetcher(args));
