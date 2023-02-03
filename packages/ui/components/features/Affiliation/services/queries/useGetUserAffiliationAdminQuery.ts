import {
  Affiliation,
  GetUserAffiliationsInput,
  Product,
  Service,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { Exact, Maybe } from "types";

export type GetUserAffiliationsQueryVariables = Exact<{
  args: GetUserAffiliationsInput;
}>;

export type GetUserAffiliationsQuery = { __typename?: "Query" } & {
  getUserAffiliations: Array<
    { __typename?: "Affiliation" } & Pick<
      Affiliation,
      | "commision"
      | "createdAt"
      | "expireAt"
      | "id"
      | "itemId"
      | "itemType"
      | "sellerId"
      | "status"
      | "updatedAt"
    > & {
        product?: Maybe<
          { __typename?: "Product" } & Pick<
            Product,
            "id" | "presentations" | "title"
          >
        >;
        service?: Maybe<
          { __typename?: "Service" } & Pick<
            Service,
            "id" | "thumbnail" | "title"
          >
        >;
      }
  >;
};

export const useGetUserAffiliationAdminQuery = (
  args: GetUserAffiliationsInput
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getUserAffiliations(
        $args:GetUserAffiliationsInput!
        ){
        getUserAffiliations(
            args:$args
        ){
            commision
            createdAt
            expireAt
            id
            itemId
            itemType
            product{
                id
                presentations
                title
            }
            sellerId
            service{
                id
                thumbnail
                title
            }
            status
            updatedAt
        }
    }
    `);

  client.setVariables<GetUserAffiliationsQueryVariables>({
    args,
  });

  return useQuery(["get-admin-user-affilation", { args }], async () => {
    const res = await client.send<GetUserAffiliationsQuery>();
    return res.data.getUserAffiliations;
  });
};
