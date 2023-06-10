import { createGraphqlRequestClient } from "api";
import { Exact, RawShop, Scalars, TranslationText } from "@features/API";
import { UseQueryOptions, useQuery } from "react-query";

export type GetRawShopQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetRawShopQuery = { __typename?: "Query" } & {
  getUserRawShop: { __typename?: "RawShop" } & Pick<
    RawShop,
    | "banner"
    | "businessType"
    | "createdAt"
    | "email"
    | "id"
    | "images"
    | "ownerId"
    | "videos"
  > & {
      description: Array<
        { __typename?: "TranslationText" } & Pick<
          TranslationText,
          "langId" | "value"
        >
      >;
      name: Array<
        { __typename?: "TranslationText" } & Pick<
          TranslationText,
          "langId" | "value"
        >
      >;
    };
};

type args = GetRawShopQueryVariables;
export const getShopRawDataQueryKey = (args: args) => [
  "get-shopraw-data",
  { args },
];

export const getShopRawDataQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getRawShop($id:String!){
  getUserRawShop(userId:$id){
    banner
    businessType
    createdAt
    description {
      langId
      value
    }
    email
    id
    images
    name {
      langId
      value
    }
    ownerId
    videos
  }
}
    `
    )
    .setVariables<GetRawShopQueryVariables>(args)
    .send<GetRawShopQuery>();

  return res.data.getUserRawShop;
};

export const useGetShopRawData = (
  args: args,
  options?: UseQueryOptions<any, unknown, any, any>
) =>
  useQuery(
    getShopRawDataQueryKey(args),
    () => getShopRawDataQueryFetcher(args),
    options
  );
