import { createGraphqlRequestClient } from "@UI/../api";
import {
  Exact,
  Maybe,
  Scalars,
  Service,
  ServiceDiscount,
  ServiceExtra,
} from "@features/API";
import { UseQueryOptions, useQuery } from "react-query";

export type GetUserServicesByIdsQueryVariables = Exact<{
  sellerId: Scalars["String"];
  servicesIds: Array<Scalars["String"]> | Scalars["String"];
}>;

export type GetUserServicesByIdsQuery = { __typename?: "Query" } & {
  getUserServicesByIds: Array<
    { __typename?: "Service" } & Pick<
      Service,
      | "id"
      | "thumbnail"
      | "type"
      | "name"
      | "num_of_rooms"
      | "ingredients"
      | "cancelationPolicy"
      | "beds"
      | "bathrooms"
      | "menuType"
      | "price"
    > & {
        discount?: Maybe<
          { __typename?: "ServiceDiscount" } & Pick<
            ServiceDiscount,
            "units" | "value"
          >
        >;
        extras?: Maybe<
          Array<
            { __typename?: "ServiceExtra" } & Pick<
              ServiceExtra,
              "cost" | "name" | "id"
            >
          >
        >;
      }
  >;
};

type args = GetUserServicesByIdsQueryVariables;
export const getUserServicesByIdsQueryKey = (args: args) => [
  "get-user-services-by-ids",
  { args },
];

export const getUserServicesByIdsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getUserServicesByIds($sellerId:String!,$servicesIds:[String!]!){
  getUserServicesByIds(sellerId:$sellerId,servicesIds:$servicesIds){
    id
    thumbnail
    type
    name
    num_of_rooms
    ingredients
    cancelationPolicy
    discount{
      units
      value
    }
    beds
    bathrooms
    menuType
    price
    extras {
      cost
      name
      id
    }
  }
}
    `
    )
    .setVariables<GetUserServicesByIdsQueryVariables>(args)
    .send<GetUserServicesByIdsQuery>();

  return res.data.getUserServicesByIds;
};

export const useGetUserServicesByIds = (
  args: args,
  options?: UseQueryOptions<
    any,
    any,
    GetUserServicesByIdsQuery["getUserServicesByIds"],
    any
  >
) =>
  useQuery(
    getUserServicesByIdsQueryKey(args),
    () => getUserServicesByIdsQueryFetcher(args),
    options
  );
