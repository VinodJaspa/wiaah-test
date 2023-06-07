import { createGraphqlRequestClient } from "api";
import { Exact } from "types";
import {
  GetFilteredServicesAdminInput,
  ServiceDiscovery,
} from "@features/Services";
import { useQuery } from "react-query";

export type GetFilteredServicesQueryVariables = Exact<{
  args: GetFilteredServicesAdminInput;
}>;

export type GetFilteredServicesQuery = { __typename?: "Query" } & {
  getFilteredServices: Array<
    { __typename?: "ServiceDiscovery" } & Pick<
      ServiceDiscovery,
      | "id"
      | "price"
      | "sellerId"
      | "sellerName"
      | "status"
      | "thumbnail"
      | "title"
      | "updatedAt"
      | "type"
    >
  >;
};

export const useGetAdminAdminFilteredServicesQuery = (
  input: GetFilteredServicesAdminInput
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getFilteredServices(
        $args:GetFilteredServicesAdminInput!
    ){
        getFilteredServices(
            args:$args
        ){
            id
            price
            sellerId
            sellerName
            status
            thumbnail
            title
            updatedAt
            type
        }
    }
    `);

  client.setVariables<GetFilteredServicesQueryVariables>({
    args: input,
  });

  return useQuery(["getFilteredServices", { input }], async () => {
    const res = await client.send<GetFilteredServicesQuery>();

    return res.data.getFilteredServices;
  });
};
