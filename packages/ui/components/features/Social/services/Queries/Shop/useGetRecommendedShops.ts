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
import { isDev, randomNum } from "utils";
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
        "id" | "title" | "discount" | "price" | "thumbnail"
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
            title
            price
            discount{
              units
              amount
            }
            thumbnail
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
    if (isDev) {
      const mockRes: GetShopRecommendedPostsQuery["getRecommendedProductPosts"] =
        [...Array(15)].map((_, i) => ({
          id: i.toString(),
          comments: randomNum(150),
          createdAt: new Date().toString(),
          product: {
            id: i.toString(),
            price: randomNum(15),
            title: [{
              langId: "en", value:
                "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galle"
            }],
            discount: {
              amount: randomNum(54),
              id: i.toString(),
              units: randomNum(56),
            },
            thumbnail: getRandomImage(),
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
              username: "Nike",
              verified: true,
            },
          },
        }));
      return mockRes;
    }

    const res = await client.send<GetShopRecommendedPostsQuery>();

    return res.data.getRecommendedProductPosts;
  });
};
