import {
  Account,
  Exact,
  GetMyReviewsInput,
  Maybe,
  Product,
  ProductReview,
  Profile,
  SellerProductsRating,
} from "../../../../features/API";
import { getRandomImage } from "../../../../../placeholder";
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
    const mockRes: GetMyReviewsQuery["getMyProductReviews"] = [...Array(5)].map(
      (v, i) => ({
        createdAt: new Date().toString(),
        id: "test",
        message: "Great Product",
        product: {
          description: "prod desc",
          id: "test",
          price: 65,
          thumbnail: getRandomImage(),
          title: "prod title",
        },
        productId: "test",
        rate: 4,
        reviewer: {
          photo: "/profile (1).jfif",
        },
        reviewerId: "test",
        updatedAt: new Date().toString(),
      }),
    );

    const mockRes1: GetMyReviewsQuery["getMySellerProductsRating"] = {
      givenStars: 60,
      id: "test",
      rating: 4,
      reviews: 15,
    };

    return {
      reviews: mockRes,
      sellerProductsRating: mockRes1,
    };

    const res = await client.send<GetMyReviewsQuery>();

    return {
      reviews: res?.data.getMyProductReviews,
      sellerProductsRating: res?.data.getMySellerProductsRating,
    };
  });
};
