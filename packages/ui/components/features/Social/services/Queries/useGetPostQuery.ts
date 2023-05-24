import { createGraphqlRequestClient } from "@UI/../api";
import {
  Affiliation,
  Exact,
  Maybe,
  NewsfeedPost,
  Product,
  Profile,
  Scalars,
  Service,
} from "@features/API";
import { useQuery } from "react-query";

export type GetSocialPostQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetSocialPostQuery = { __typename?: "Query" } & {
  getSocialPostById: { __typename?: "NewsfeedPost" } & Pick<
    NewsfeedPost,
    "type" | "createdAt" | "views" | "reactionNum" | "comments" | "shares"
  > & {
      affiliation: { __typename?: "Affiliation" } & Pick<
        Affiliation,
        "commision" | "itemType"
      > & {
          product?: Maybe<
            { __typename?: "Product" } & Pick<
              Product,
              "price" | "thumbnail" | "title"
            >
          >;
          service?: Maybe<
            { __typename?: "Service" } & Pick<
              Service,
              "thumbnail" | "price" | "name"
            >
          >;
        };
      publisher?: Maybe<
        { __typename?: "Profile" } & Pick<
          Profile,
          "photo" | "username" | "id" | "ownerId" | "verified"
        >
      >;
      service: { __typename?: "Service" } & Pick<
        Service,
        "thumbnail" | "name" | "price"
      >;
      product: { __typename?: "Product" } & Pick<
        Product,
        "thumbnail" | "title" | "price"
      >;
    };
};

type args = GetSocialPostQueryVariables;
export const getSocialPostQueryKey = (args: args) => [
  "get-social-post",
  { args },
];

export const getSocialPostQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  // TODO: add query and vars after creating a the graphql shared posts query
  const res = await client
    .setQuery(
      `
query getSocialPost($id:String!){
  getSocialPostById(id:$id){
    type
 		createdAt
    views
    reactionNum
    comments
    shares
    affiliation{
      product {
        price
        thumbnail
        title
      }
      commision
      itemType
      service{
        thumbnail
        price
        name
      }
    }
    publisher{
     photo
      username
      id
      ownerId
      verified
    }
    service{
      thumbnail
      name
      price
    }
    
    product{
      thumbnail
      title
      price
    }
  }
}
  `
    )
    .setVariables<args>(args)
    .send<GetSocialPostQuery>();

  return res.data.getSocialPostById;
};

export const useGetSocialPostQuery = (args: args) => {
  return useQuery(getSocialPostQueryKey(args), () =>
    getSocialPostQueryFetcher(args)
  );
};
