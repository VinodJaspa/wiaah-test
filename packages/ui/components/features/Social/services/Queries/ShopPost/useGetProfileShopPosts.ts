import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import { useQuery } from "react-query";
import { GetUserProductPostsInput, ProductPost, Profile } from "@features/API";
import { Product } from "@features/API";
import { Account } from "@features/API";

export type GetProfileShopPostsQueryVariables = Exact<{
  args: GetUserProductPostsInput;
}>;

export type GetProfileShopPostsQuery = { __typename?: "Query" } & {
  getUserProductPosts: Array<
    { __typename?: "ProductPost" } & Pick<
      ProductPost,
      | "id"
      | "visibility"
      | "shares"
      | "comments"
      | "reactionNum"
      | "productId"
      | "views"
    > & {
        product: { __typename?: "Product" } & Pick<
          Product,
          "id" | "presentations" | "hashtags"
        >;
        user?: Maybe<
          { __typename?: "Account" } & Pick<Account, "id" | "type"> & {
              profile?: Maybe<
                { __typename?: "Profile" } & Pick<
                  Profile,
                  | "photo"
                  | "username"
                  | "verified"
                  | "id"
                  | "profession"
                  | "visibility"
                >
              >;
            }
        >;
      }
  >;
};

export const useGetProfileShopPosts = (args: GetUserProductPostsInput) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getProfileShopPosts(
            $args:GetUserProductPostsInput!
        ){
            getUserProductPosts(
                args:$args
            ){
            id
            visibility
            shares
            comments
            views
            reactionNum
            productId
            product {
                id
                presentations
                hashtags
            }
            comments
            user{
                id
                type
                profile{
                    id
                    photo
                    username
                    verified
                    profession
                    visibility
                }
            }
            }
        }
    `);

  client.setVariables<GetProfileShopPostsQueryVariables>({
    args,
  });
  return useQuery(["profile-product-posts", { args }], async () => {
    const res = await client.send<GetProfileShopPostsQuery>();

    return res.data.getUserProductPosts;
  });
};
