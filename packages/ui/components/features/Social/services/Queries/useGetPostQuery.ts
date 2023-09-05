import { createGraphqlRequestClient } from "api";
import { getRandomName, isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import { Exact, PostType } from "@features/API";
import { UseQueryOptions, useQuery } from "react-query";

export type GetSocialPostQueryVariables = Exact<{
  id: string;
}>;

export type GetSocialPostQuery = {
  __typename?: "Query";
  getSocialPostById: {
    __typename?: "NewsfeedPost";
    type: PostType;
    createdAt: string;
    views: number;
    reactionNum: number;
    comments: number;
    shares: number;
    userId: string;
    id: string;
    productIds?: Array<string> | null;
    isLiked: boolean;
    isCommented: boolean;
    isSaved: boolean;
    publisher?: {
      __typename?: "Profile";
      photo: string;
      username: string;
      id: string;
      ownerId: string;
      verified: boolean;
    } | null;
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
      // product: {
      //   price: randomNum(13),
      //   thumbnail: getRandomImage(),
      //   title: "test product",
      // },
      // service: {
      //   name: "service name",
      //   price: randomNum(160),
      //   thumbnail: getRandomImage(),
      // },
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
      // affiliation: {
      //   commision: randomNum(10),
      //   itemType: "product",
      //   product: {
      //     thumbnail: getRandomImage(),
      //     price: randomNum(150),
      //     title: "product title",
      //   },
      // },
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
query getSocialPost($id: String!) {
  getSocialPostById(id: $id) {
    type
    createdAt
    views
    reactionNum
    comments
    shares
    userId
    id
    productIds
    isLiked
    isCommented
    isSaved
    publisher {
      photo
      username
      id
      ownerId
      verified
    }
  }
}

`
    )
    .setVariables<args>(args)
    .send<GetSocialPostQuery>();

  return res.data.getSocialPostById;
};

export const useGetSocialPostQuery = (
  args: args,
  options?: UseQueryOptions<
    GetSocialPostQueryVariables,
    any,
    GetSocialPostQuery["getSocialPostById"]
  >
) => {
  return useQuery(
    getSocialPostQueryKey(args),
    () => getSocialPostQueryFetcher(args),
    options
  );
};
