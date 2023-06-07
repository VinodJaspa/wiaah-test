import { createGraphqlRequestClient } from "api";
import { isDev } from "@UI/../utils/src";
import {
  BusinessType,
  Exact,
  Scalars,
  ServiceType,
  Shop,
  StoreType,
} from "@features/API";
import { useUserData } from "@src/index";
import { UseQueryOptions, useQuery } from "react-query";

export type GetUserShopTypeQueryVariables = Exact<{
  userId: Scalars["String"];
}>;

export type GetUserShopTypeQuery = { __typename?: "Query" } & {
  getUserShop: { __typename?: "Shop" } & Pick<
    Shop,
    "type" | "businessType" | "createdAt" | "id" | "storeType" | "ownerId"
  >;
};

export const useGetUserShopType = (
  args: GetUserShopTypeQueryVariables,
  options?: UseQueryOptions<any, any, GetUserShopTypeQuery["getUserShop"], any>
) => {
  return useQuery(
    ["get-user-shop-type", { args }],
    async () => {
      if (isDev) {
        const mockRes: GetUserShopTypeQuery["getUserShop"] = {
          businessType: BusinessType.Individual,
          createdAt: new Date(),
          id: "",
          storeType: StoreType.Product,
          type: ServiceType.Hotel,
          ownerId: "",
        };
      }

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
    ownerId
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
