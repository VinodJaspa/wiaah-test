import { createGraphqlRequestClient } from "@UI/../api";
import { isDev } from "@UI/../utils/src";
import { Exact, RestaurantDishType, Scalars, Service } from "@features/API";
import { UseQueryOptions, useQuery } from "react-query";

export type GetShopServicesByIdsQueryVariables = Exact<{
  sellerId: Scalars["String"];
  ids: Array<Scalars["String"]> | Scalars["String"];
}>;

export type GetShopServicesByIdsQuery = { __typename?: "Query" } & {
  getUserServicesByIds: Array<
    { __typename?: "Service" } & Pick<
      Service,
      | "id"
      | "thumbnail"
      | "name"
      | "menuType"
      | "treatmentCategory"
      | "ingredients"
      | "price"
    >
  >;
};

type args = GetShopServicesByIdsQueryVariables;

export const getShopServicesQueryKey = (args: args) => [
  "get-shop-services",
  { args },
];

export const getShopServicesQueryFetcher = async (args: args) => {
  if (isDev) {
    const mockRes: GetShopServicesByIdsQuery["getUserServicesByIds"] = [
      {
        id: "",
        name: "Body treatment - back pain treatment",
        price: 100,
        thumbnail: "/treatment-back.png",
        ingredients: ["Tomato", "Mozzarella", "Basil"],
        menuType: RestaurantDishType.Starter,
      },
    ];

    return mockRes;
  }

  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getShopServicesByIds(
  $sellerId:String!
  $ids:[String!]!
){
  	getUserServicesByIds(sellerId:$sellerId,servicesIds:$ids){
    id
    thumbnail
    name
    menuType
    treatmentCategory
    ingredients
    price
  }
}
    `
    )
    .setVariables<GetShopServicesByIdsQueryVariables>(args)
    .send<GetShopServicesByIdsQuery>();

  return res.data.getUserServicesByIds;
};

export const useGetShopServicesQuery = (
  args: args,
  options?: UseQueryOptions<
    any,
    any,
    GetShopServicesByIdsQuery["getUserServicesByIds"],
    any
  >
) =>
  useQuery(
    getShopServicesQueryKey(args),
    () => getShopServicesQueryFetcher(args),
    options
  );
