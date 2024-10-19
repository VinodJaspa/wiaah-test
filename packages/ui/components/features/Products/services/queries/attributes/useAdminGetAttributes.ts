import {
  Exact,
  GetAdminProductAttributesPaginationInput,
} from "../../../../../features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetAdminProductAttributesQueryVariables = Exact<{
  args: GetAdminProductAttributesPaginationInput;
}>;

export type GetAdminProductAttributesQuery = {
  __typename?: "Query";
  adminGetAttributes: {
    __typename?: "ProductAttributesPaginationResponse";
    hasMore: boolean;
    total: number;
    data: Array<{ __typename?: "ProductAttribute"; id: string; name: string }>;
  };
};

type args = GetAdminProductAttributesQueryVariables["args"];

export const useAdminGetAttributesQuery = (args: args) =>
  useQuery(["admin-get-attributes", { args }], async () => {
    const client = createGraphqlRequestClient();

    const res = await client
      .setQuery(
        `
query getAdminProductAttributes(
  $args: GetAdminProductAttributesPaginationInput!
) {
  adminGetAttributes(args: $args) {
    data {
      id
      name
    }
    hasMore
    total
  }
}
    `,
      )
      .setVariables<GetAdminProductAttributesQueryVariables>({ args })
      .send<GetAdminProductAttributesQuery>();

    return res?.data?.adminGetAttributes;
  });
