import { createGraphqlRequestClient } from "api";
import { getRandomName, isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import {
  Affiliation,
  Exact,
  Maybe,
  NewsfeedPost,
  PostType,
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
    | "type"
    | "createdAt"
    | "views"
    | "reactionNum"
    | "comments"
    | "shares"
    | "userId"
    | "id"
    | "isLiked"
    | "isSaved"
    | "isCommented"
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
  if (isDev) {
    const mockRes: GetSocialPostQuery["getSocialPostById"] = {
      id: "342",
      comments: randomNum(150),
      createdAt: new Date().toUTCString(),
      product: {
        price: randomNum(13),
        thumbnail: getRandomImage(),
        title: "test product",
      },
      service: {
        name: "service name",
        price: randomNum(160),
        thumbnail: getRandomImage(),
      },
      reactionNum: randomNum(1600),
      shares: randomNum(1700),
      userId: "tesat1321",
      views: randomNum(20000),
      type: PostType.NewsfeedPost,
      publisher: {
        id: "134",
        ownerId: "134",
        photo: getRandomImage(),
        username: getRandomName().firstName,
        verified: true,
      },
      affiliation: {
        commision: randomNum(10),
        itemType: "product",
        product: {
          thumbnail: getRandomImage(),
          price: randomNum(150),
          title: "product title",
        },
      },
      isCommented: true,
      isLiked: true,
      isSaved: true,
    };
    return mockRes;
  }

  const client = createGraphqlRequestClient();

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
    userId
    id
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
