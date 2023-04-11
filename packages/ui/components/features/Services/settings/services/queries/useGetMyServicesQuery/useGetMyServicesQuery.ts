import {
  Exact,
  GqlCursorPaginationInput,
  Scalars,
  Service,
  ServicesCursorPaginationResponse,
} from "@features/API";
import { useUserData } from "@src/index";
import { createGraphqlRequestClient } from "api";
import { useQuery, UseQueryOptions } from "react-query";

export type GetUserServicesQueryVariables = Exact<{
  userId: Scalars["String"];
  pagination: GqlCursorPaginationInput;
}>;

export type GetUserServicesQuery = { __typename?: "Query" } & {
  getUserServices: { __typename?: "ServicesCursorPaginationResponse" } & Pick<
    ServicesCursorPaginationResponse,
    "cursor" | "hasMore"
  > & {
      data: Array<
        { __typename?: "Service" } & Pick<
          Service,
          | "id"
          | "name"
          | "thumbnail"
          | "price"
          | "beds"
          | "bathrooms"
          | "brand"
          | "model"
          | "speciality"
          | "createdAt"
          | "num_of_rooms"
          | "type"
          | "menuType"
          | "treatmentCategory"
        >
      >;
    };
};

export const getUserServicesQueryKey = (
  args: GetUserServicesQueryVariables
) => ["myServices", { args }];
export const useGetUserServicesQuery = (
  userId: string,
  pagination: GetUserServicesQueryVariables["pagination"],
  options?: UseQueryOptions<
    unknown,
    unknown,
    GetUserServicesQuery["getUserServices"],
    any
  >
) => {
  return useQuery(
    getUserServicesQueryKey({ pagination, userId }),
    () => {
      const client = createGraphqlRequestClient();

      const res = client
        .setQuery(
          `
query getUserServices($userId:String!, $pagination:GqlCursorPaginationInput!) {
  getUserServices(pagination:$pagination,userId:$userId) {
    cursor
    hasMore
    data {
      id
      name
      thumbnail
      price
      beds
      bathrooms
      brand
      model
      speciality
      createdAt
      num_of_rooms
      type
      menuType
      treatmentCategory
    }
  }
}
      `
        )
        .setVariables<GetUserServicesQueryVariables>({
          pagination,
          userId: userId,
        })
        .send<GetUserServicesQuery>();
    },
    options
  );
};

export const useGetMyServicesQuery = (
  pagination: GetUserServicesQueryVariables["pagination"],
  options: Parameters<typeof useGetUserServicesQuery>[2]
) => {
  const { user } = useUserData();

  return useGetUserServicesQuery(user?.id!, pagination, {
    enabled: !!user?.id!,
    ...options,
  });
};
