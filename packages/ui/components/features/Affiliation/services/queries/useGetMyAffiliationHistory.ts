import { Account } from "@features/Accounts";
import {
  AffiliationPurchase,
  GetAffiliationHistoryInput,
} from "@features/Affiliation/types";
import { Product } from "@features/Products";
import { Service } from "@features/Services";
import { Profile } from "@features/Social";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { Exact, Maybe } from "types";

export type GetMyAffiliatiomHistoryQueryVariables = Exact<{
  args: GetAffiliationHistoryInput;
}>;

export type GetMyAffiliatiomHistoryQuery = { __typename?: "Query" } & {
  getMyProductsAffiliationHistory: Array<
    {
      __typename?: "AffiliationPurchase";
    } & Pick<
      AffiliationPurchase,
      | "id"
      | "itemId"
      | "purchaserId"
      | "sellerId"
      | "paidCommissionAmount"
      | "paidCommissionPercent"
    > & {
        product?: Maybe<
          { __typename?: "Product" } & Pick<
            Product,
            "id" | "thumbnail" | "title" | "price"
          >
        >;
        service?: Maybe<
          { __typename?: "Service" } & Pick<
            Service,
            "id" | "serviceType" | "thumbnail" | "title" | "price"
          >
        >;
        affiliator: { __typename?: "Account" } & Pick<Account, "id"> & {
            profile: Maybe<Pick<Profile, "username">>;
          };
        seller: { __typename?: "Account" } & Pick<Account, "id"> & {
            profile: Maybe<Pick<Profile, "username">>;
          };
        purchaser: { __typename?: "Account" } & Pick<Account, "id"> & {
            profile: Maybe<Pick<Profile, "username">>;
          };
      }
  >;
};

export const useGetMyAffiliationHistoryQuery = (
  input: GetAffiliationHistoryInput
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getMyAffiliatiomHistory(
            $args:GetAffiliationHistoryInput!
        ){
            getMyProductsAffiliationHistory(
                args:$args
            ){
                id
                itemId
                purchaserId
                sellerId
                paidCommissionAmount
                paidCommissionPercent
                product {
                    id 
                }
                purchaserId
                sellerId
                service{
                    id
                    type
                }
                product {
                    id
                }
                affiliator{
                    id
                }
                seller{
                    id
                }
                purchaser{
                    id
                }
            }
        }
    `);

  client.setVariables<GetMyAffiliatiomHistoryQueryVariables>({
    args: input,
  });

  return useQuery(["get-my-affiliation-history"], async () => {
    const res = await client.send<GetMyAffiliatiomHistoryQuery>();

    return res.data.getMyProductsAffiliationHistory;
  });
};
