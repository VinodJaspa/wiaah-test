import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import { useQuery } from "react-query";
import {
  AccountType,
  CashbackType,
  GetUserProductPostsInput,
  PostVisibility,
  PresentationType,
  ProductPost,
  Profile,
  ProfileVisibility,
  VisibilityEnum,
} from "@features/API";
import { Product } from "@features/API";
import { Account } from "@features/API";
import { random } from "lodash";
import { getRandomImage } from "@UI/placeholder";

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
        | "id"
        | "presentations"
        | "hashtags"
        | "title"
        | "cashback"
        | "discount"
        | "price"
        | "thumbnail"
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
            thumbnail
              id
                presentations
                hashtags
                title
                price
                cashback {
                  amount
                  id
                  type
                  units
                }
                discount {
                  amount
                  id
                  units
                }
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
    const ph: GetProfileShopPostsQuery["getUserProductPosts"] = [
      ...Array(30),
    ].map((_, i) => ({
      id: i.toString(),
      comments: random(1500),
      productId: i.toString(),
      product: {
        cashback: {
          amount: random(12),
          id: i.toString(),
          type: CashbackType.Cash,
          units: random(15),
        },
        discount: {
          amount: random(156),
          id: i.toString(),
          units: random(130),
        },
        hashtags: [],
        id: i.toString(),
        presentations: [
          { src: getRandomImage(), type: PresentationType.Image },
        ],
        thumbnail: getRandomImage(),
        price: random(150),
        title: "test title",
      },
      reactionNum: random(1500),
      shares: random(162),
      views: random(1563213),
      visibility: PostVisibility.Public,
      user: {
        id: i.toString(),
        type: AccountType.Seller,
        profile: {
          id: i.toString(),
          photo: "/profile (3).jfif",
          profession: "profession",
          username: "username",
          verified: true,
          visibility: ProfileVisibility.Public,
        },
      },
    }));

    return ph;

    const res = await client.send<GetProfileShopPostsQuery>();

    return res.data.getUserProductPosts;
  });
};
