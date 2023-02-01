import {
  Account,
  Exact,
  GetMyReviewsInput,
  Maybe,
  Product,
  ProductReview,
  Profile,
  SellerProductsRating,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetMyReviewsQueryVariables = Exact<{
  args: GetMyReviewsInput;
}>;

export type GetMyReviewsQuery = { __typename?: "Query" } & {
  getMyProductReviews: Array<
    { __typename?: "ProductReview" } & Pick<
      ProductReview,
      | "createdAt"
      | "id"
      | "message"
      | "productId"
      | "rate"
      | "reviewerId"
      | "updatedAt"
    > & {
        product: { __typename?: "Product" } & Pick<
          Product,
          "id" | "price" | "thumbnail" | "description" | "title"
        >;
        reviewer: { __typename?: "Account" } & Pick<Account, "photo"> & {
            profile?: Maybe<
              { __typename?: "Profile" } & Pick<
                Profile,
                "id" | "photo" | "username"
              >
            >;
          };
      }
  >;
  getMySellerProductsRating: { __typename?: "SellerProductsRating" } & Pick<
    SellerProductsRating,
    "givenStars" | "id" | "rating" | "reviews"
  >;
};

export const useGetMyReviewsQuery = (input: GetMyReviewsInput) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getMyReviews(
            $args:GetMyReviewsInput!
        ){
            getMyProductReviews(
                args:$args
            ){
                createdAt
                id
                message
                productId
                product {
                    id
                    price
                    thumbnail
                }
                rate
                reviewerId
                updatedAt
                reviewer{
                    photo
                    profile{
                        id
                        photo
                        username
                    }
                }
            }

            getMySellerProductsRating {
                givenStars
                id
                rating
                reviews
            }
        }
    `);

  client.setVariables<GetMyReviewsQueryVariables>({
    args: input,
  });

  return useQuery(["my-reviews"], async () => {
    const res = await client.send<GetMyReviewsQuery>();

    return {
      reviews: res.data.getMyProductReviews,
      sellerProductsRating: res.data.getMySellerProductsRating,
    };
  });
};
