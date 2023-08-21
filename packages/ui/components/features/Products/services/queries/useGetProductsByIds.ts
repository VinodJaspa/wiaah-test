import { Exact } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetProductsByIdsQueryVariables = Exact<{
  ids: string[];
}>;

export type GetProductsByIdsQuery = {
  __typename?: "Query";
  getProductsByIds: Array<{
    __typename?: "Product";
    title: string;
    thumbnail: string;
    price: number;
    id: string;
  }>;
};

export type args = GetProductsByIdsQueryVariables;

export const getProductsByIdsQueryKey = (args: args) => [
  "get-products-by-ids",
  { args },
];

export const getProductsByIdsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getProductsByIds($ids: [String!]!) {
  getProductsByIds(ids: $ids) {
    title
    thumbnail
    price
    id
  }
}
  `
    )
    .setVariables<GetProductsByIdsQueryVariables>(args)
    .send<GetProductsByIdsQuery>();

  return res.data.getProductsByIds;
};

export const useGetProductsByIds = (args: args) =>
  useQuery(getProductsByIdsQueryKey(args), () =>
    getProductsByIdsQueryFetcher(args)
  );
