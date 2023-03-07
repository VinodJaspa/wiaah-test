import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { Exact, Maybe } from "types";
import {
  CashbackType,
  GetShopRecommendedPostsInput,
  PostLocation,
  PresentationType,
  ProductPost,
  Profile,
} from "@features/API";
import { Product } from "@features/API";
import { Account } from "@features/API";
import { randomNum } from "utils";
import { getRandomImage } from "@UI/placeholder";

export type GetShopRecommendedPostsQueryVariables = Exact<{
  args: GetShopRecommendedPostsInput;
}>;

export type GetShopRecommendedPostsQuery = { __typename?: "Query" } & {
  getRecommendedProductPosts: Array<
    { __typename?: "ProductPost" } & Pick<
      ProductPost,
      | "id"
      | "productId"
      | "views"
      | "shares"
      | "reactionNum"
      | "comments"
      | "userId"
      | "createdAt"
    > & {
        location?: Maybe<
          { __typename?: "PostLocation" } & Pick<
            PostLocation,
            "address" | "city" | "country" | "state"
          >
        >;
        product: { __typename?: "Product" } & Pick<
          Product,
          | "id"
          | "cashback"
          | "presentations"
          | "title"
          | "discount"
          | "hashtags"
          | "price"
        >;
        user?: Maybe<
          { __typename?: "Account" } & Pick<Account, "id"> & {
              profile?: Maybe<
                { __typename?: "Profile" } & Pick<
                  Profile,
                  "photo" | "username" | "id" | "verified" | "profession"
                >
              >;
            }
        >;
      }
  >;
};

export const useGetRecommendedShopPostsQuery = (
  args: GetShopRecommendedPostsInput
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
     query getShopRecommendedPosts(
    $args:GetShopRecommendedPostsInput!
) {
    getRecommendedProductPosts(
        args:$args
    ){
        id
        productId
        views
        shares
        reactionNum
        comments
        location {
            address
            city
            country
            state
        }
        product {
            id
        }
        userId
        createdAt
        user{
            id
            profile{
                photo
                username
                id
                verified
                profession

            }
        }
    }
}
    `);

  client.setVariables<GetShopRecommendedPostsQueryVariables>({
    args,
  });
  return useQuery(["get-recommended-shop-posts", { args }], async () => {
    return [...Array(15)].map((_, i) => ({
      id: i.toString(),
      comments: randomNum(150),
      createdAt: new Date().toString(),
      product: {
        hashtags: [],
        id: i.toString(),
        presentations: [
          { src: getRandomImage(), type: PresentationType.Image },
        ],
        price: randomNum(15),
        title: "title",
        cashback: {
          amount: randomNum(5),
          id: i.toString(),
          units: 5,
          type: CashbackType.Cash,
        },
        discount: {
          amount: randomNum(54),
          id: i.toString(),
          units: randomNum(56),
        },
      },
      productId: i.toString(),
      reactionNum: randomNum(56),
      shares: randomNum(5),
      userId: i.toString(),
      views: randomNum(546),
      user: {
        id: i.toString(),
        profile: {
          id: i.toString(),
          photo: getRandomImage(),
          profession: "profession",
          username: "name",
          verified: true,
        },
      },
    }));

    const res = await client.send<GetShopRecommendedPostsQuery>();

    return res.data.getRecommendedProductPosts;
  });
};
