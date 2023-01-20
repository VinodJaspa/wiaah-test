import {
  AffiliationPurchase,
  GetUserAffiliationsInput,
  GetUserAffiliationsPurchasesInput,
} from "@features/Affiliation/types";
import { Product } from "@features/Products";
import { Service } from "@features/Services";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { Exact, Maybe } from "types";

export type GetAffiliationPurchasesQueryVariables = Exact<{
  args: GetUserAffiliationsPurchasesInput;
}>;

export type GetAffiliationPurchasesQuery = { __typename?: "Query" } & {
  getUserAffiliationsPurchases: Array<
    { __typename?: "AffiliationPurchase" } & Pick<
      AffiliationPurchase,
      | "affiliatorId"
      | "createdAt"
      | "id"
      | "itemType"
      | "purchaserId"
      | "sellerId"
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

export const useGetUserAffiliationHistoryAdminQuery = (
  args: GetUserAffiliationsPurchasesInput
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

  client.setVariables<GetAffiliationPurchasesQueryVariables>({
    args,
  });

  return useQuery(["get-admin-user-affilation", { args }], async () => {
    const res = await client.send<GetAffiliationPurchasesQuery>();
    return res.data.getUserAffiliationsPurchases;
  });
};
