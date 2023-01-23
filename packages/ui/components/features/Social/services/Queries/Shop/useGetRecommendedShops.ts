import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { Exact, Maybe } from "types";
import {
  GetShopRecommendedPostsInput,
  PostLocation,
  ProductPost,
  Profile,
} from "@features/Social/services/types";
import { Product } from "@features/Products";
import { Account } from "@features/Accounts";

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
    const res = await client.send<GetShopRecommendedPostsQuery>();

    return res.data.getRecommendedProductPosts;
  });
};
