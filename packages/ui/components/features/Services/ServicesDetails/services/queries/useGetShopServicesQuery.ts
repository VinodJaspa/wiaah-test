import { createGraphqlRequestClient } from "api";
import { isDev } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
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
      | "extras"
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
        name: "Hotel  romm with double bed",
        price: 100,
        thumbnail: getRandomImage(),
        ingredients: ["Tomato", "Mozzarella", "Basil"],
        menuType: RestaurantDishType.Starter,
        extras: [
          {
            cost: 4,
            id: "",
            name: "Parking",
          },
        ],
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
