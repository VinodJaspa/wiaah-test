import { createGraphqlRequestClient } from "@UI/../api";
import { Exact, Scalars, Shop } from "@features/API";
import { useUserData } from "@src/index";
import { UseQueryOptions, useQuery } from "react-query";

export type GetUserShopTypeQueryVariables = Exact<{
  userId: Scalars["String"];
}>;

export type GetUserShopTypeQuery = { __typename?: "Query" } & {
  getUserShop: { __typename?: "Shop" } & Pick<
    Shop,
    "type" | "businessType" | "createdAt" | "id" | "storeType"
  >;
};

export const useGetUserShopType = (
  args: GetUserShopTypeQueryVariables,
  options?: UseQueryOptions<any, any, GetUserShopTypeQuery["getUserShop"], any>
) => {
  return useQuery(
    ["get-user-shop-type", { args }],
    async () => {
      const client = createGraphqlRequestClient();

      const res = await client
        .setQuery(
          `
query getUserShopType($userId:String!){
  getUserShop(userId:$userId){
    type
    businessType
    createdAt
    id
    storeType
  }
}
    `
        )
        .setVariables<GetUserShopTypeQueryVariables>(args)
        .send<GetUserShopTypeQuery>();

      return res.data.getUserShop;
    },
    options
  );
};

export const useGetMyShopType = () => {
  const { user } = useUserData();
  return useGetUserShopType({ userId: user?.id! }, { enabled: !!user?.id });
};
