import {
  Affiliation,
  AffiliationPurchase,
  Exact,
  GetFilteredAffiliationHistoryInput,
  Maybe,
  Product,
  Profile,
  Service,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetAffiliationHistoryQueryVariables = Exact<{
  args: GetFilteredAffiliationHistoryInput;
}>;

export type AdminGetAffiliationHistoryQuery = { __typename?: "Query" } & {
  getFilteredAffiliationsHistory: Array<
    { __typename?: "AffiliationPurchase" } & Pick<
      AffiliationPurchase,
      | "id"
      | "itemId"
      | "itemType"
      | "paidCommissionAmount"
      | "paidCommissionPercent"
      | "affiliatorId"
      | "purchaserId"
      | "sellerId"
    > & {
        product?: Maybe<
          { __typename?: "Product" } & Pick<
            Product,
            "title" | "thumbnail" | "price"
          >
        >;
        service?: Maybe<
          { __typename?: "Service" } & Pick<
            Service,
            "title" | "thumbnail" | "price"
          >
        >;
        seller: { __typename?: "Account" } & {
          profile?: Maybe<
            { __typename?: "Profile" } & Pick<Profile, "username">
          >;
        };
        purchaser: { __typename?: "Account" } & {
          profile?: Maybe<
            { __typename?: "Profile" } & Pick<Profile, "username">
          >;
        };
        affiliation: { __typename?: "Affiliation" } & Pick<Affiliation, "id">;
        affiliator: { __typename?: "Account" } & {
          profile?: Maybe<
            { __typename?: "Profile" } & Pick<Profile, "username" | "photo">
          >;
        };
      }
  >;
};

type args = AdminGetAffiliationHistoryQueryVariables["args"];

export const getAdminAffiliationsHistoryQueryKey = (args: args) => [
  "admin-affiliations",
  { args },
];

export const getAdminAffiliationsHistoryQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetAffiliationHistory($args:GetFilteredAffiliationHistoryInput!){
  	getFilteredAffiliationsHistory(filters:$args){
    id
    itemId
    itemType
    paidCommissionAmount
    paidCommissionPercent
    affiliatorId
    purchaserId
    sellerId
    paidCommissionAmount
    paidCommissionPercent
    product{
      title
      thumbnail
      price
    }
    service{
      title
      thumbnail
      price
    }
    seller{
      profile{
        username
      }
    }
    purchaser{
      profile{
        username
      }
    }
    affiliation{
      id
    }
    affiliator{
      profile{
        username
        photo
        
      }
    }
  }
}
    `);

  const res = await client
    .setVariables<AdminGetAffiliationHistoryQueryVariables>({ args })
    .send<AdminGetAffiliationHistoryQuery>();

  return res.data.getFilteredAffiliationsHistory;
};

export const useGetAdminAffiliationsHistoryQuery = (args: args) =>
  useQuery(getAdminAffiliationsHistoryQueryKey(args), () =>
    getAdminAffiliationsHistoryQueryFetcher(args)
  );
