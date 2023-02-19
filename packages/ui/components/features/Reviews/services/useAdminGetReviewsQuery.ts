import {
  Exact,
  GetAdminFitleredProductReviewsInput,
  Maybe,
  Product,
  ProductReview,
  Profile,
} from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";

export type AdminGetReviewsQueryVariables = Exact<{
  args: GetAdminFitleredProductReviewsInput;
}>;

export type AdminGetReviewsQuery = { __typename?: "Query" } & {
  adminGetFilteredProductReviews: Array<
    { __typename?: "ProductReview" } & Pick<
      ProductReview,
      "message" | "rate" | "createdAt" | "id"
    > & {
        product: { __typename?: "Product" } & Pick<
          Product,
          "id" | "thumbnail" | "title"
        > & {
            seller: { __typename?: "Account" } & {
              profile?: Maybe<
                { __typename?: "Profile" } & Pick<Profile, "username">
              >;
            };
          };
        reviewer: { __typename?: "Account" } & {
          profile?: Maybe<
            { __typename?: "Profile" } & Pick<Profile, "username">
          >;
        };
      }
  >;
};

type args = AdminGetReviewsQueryVariables["args"];

export const adminGetReviewsQueryKey = (args: args) => [
  "admin-get-reviews",
  { args },
];

export const adminGetReviewsFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetReviews($args:GetAdminFitleredProductReviewsInput!) {
  adminGetFilteredProductReviews(
    args:$args
  ){
    product{
      title
    }
    reviewer{
      profile{
        username
        thumbnail
        id
      }
    }
    message
    rate
    createdAt
    id
  }
}
    `);

  const res = await client
    .setVariables<AdminGetReviewsQueryVariables>({ args })
    .send<AdminGetReviewsQuery>();

  return res.data.adminGetFilteredProductReviews;
};

export const useAdminGetProductReviews = (args: args) =>
  useQuery(adminGetReviewsQueryKey(args), () => adminGetReviewsFetcher(args));
