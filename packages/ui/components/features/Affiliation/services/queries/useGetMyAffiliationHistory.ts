import {
  Account,
  AffiliationPurchase,
  GetAffiliationHistoryInput,
  Product,
  Profile,
  Service,
} from "@features/API";
import { getRandomImage } from "@UI/placeholder";
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
      | "itemType"
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
          "id" | "type" | "thumbnail" | "name" | "price"
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
                itemType
                purchaserId
                sellerId
                service{
                    id
                    type
                    name
                    thumbnail
                    price
                }
                product {
                    id
                    thumbnail
                    title
                    price
                }
                affiliator{
                    id
                    profile {
                      username
                    }
                }
                seller{
                    id
                }
                purchaser{
                    id
                    profile {
                      username
                    }
                }
            }
        }
    `);

  client.setVariables<GetMyAffiliatiomHistoryQueryVariables>({
    args: input,
  });

  return useQuery(["get-my-affiliation-history"], async () => {
    const mockRes = [...Array(5)].map((v, i) => ({
        __typename: "AffiliationPurchase",
        id: "1",
        itemId: "101",
        purchaserId: "user123",
        sellerId: "seller456",
        paidCommissionAmount: 10.5,
        paidCommissionPercent: 5,
        itemType: "Product",
        product: {
          __typename: "Product",
          id: "101",
          thumbnail: `https://picsum.photos/seed/${i}/200/150`,
          title: `Sample Product ${i + 1}`,
          price: 99.99,
        },
        affiliator: {
          __typename: "Account",
          id: "affiliate789",
          profile: {
            username: "affiliate_user",
          },
        },
        seller: {
          __typename: "Account",
          id: "seller456",
          profile: {
            username: "seller_user",
          },
        },
        purchaser: {
          __typename: "Account",
          id: "user123",
          profile: {
            username: "purchaser_user",
          },
        },
      })) as unknown as GetMyAffiliatiomHistoryQuery["getMyProductsAffiliationHistory"];

    return mockRes;
    const res = await client.send<GetMyAffiliatiomHistoryQuery>();

    return res.data.getMyProductsAffiliationHistory;
  });
};
