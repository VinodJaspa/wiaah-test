import { createGraphqlRequestClient } from "api";
import { getRandomName, isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import { Exact } from "@features/API";
import { useQuery } from "react-query";

export type GetSuggestedActionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetSuggestedActionsQuery = {
  __typename?: "Query";
  getMyRecommendedAction: {
    __typename?: "Action";
    src: string;
    reactionNum: number;
    comments: number;
    shares: number;
    id: string;
    audioId?: string | null;
    musicId?: string | null;
    audio?: { __typename?: "Audio"; src?: string | null; name: string } | null;
    tags: Array<{ __typename?: "PostTag"; userId: string }>;
    effect?: { __typename?: "Effect"; name: string } | null;
    location: {
      __typename?: "PostLocation";
      address?: string | null;
      city: string;
      country: string;
      state?: string | null;
    };
    profile: {
      __typename?: "Profile";
      photo: string;
      username: string;
      verified: boolean;
      id: string;
      ownerId: string;
    };
  };
};

type args = GetSuggestedActionsQueryVariables;

export const getPeronalizedActionsQueryKey = () => ["get-personalized-actions"];

export const getPeronalizedActionsQueryFetcher = async () => {
  if (isDev) {
    const mockRes: GetSuggestedActionsQuery["getMyRecommendedAction"] = {
      comments: randomNum(123456),
      reactionNum: randomNum(123456),
      shares: randomNum(123456),
      src: "/action.mp4",
      id: "Teasdasd",
      musicId: "Kafir - Nile",
      tags: [{ userId: "" }, { userId: "" }, { userId: "" }],
      effect: {
        name: "Clarendon",
      },
      profile: {
        id: "",
        ownerId: "",
        photo: getRandomImage(),
        username: getRandomName().firstName,
        verified: true,
      },
      location: {
        city: "city",
        country: "country",
        address: "address",
        state: "state",
      },
    };

    return mockRes;
  }

  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getSuggestedActions{
  getMyRecommendedAction{
    src
    reactionNum
    comments
    shares
    id
    audioId
    audio{
        src
        name
    }
    musicId
    tags {
      userId
    }
    effect{
      name
    }
    location {
      address
      city
      country
      state
    }
    profile {
      photo
      username
      verified
      id
      ownerId
    }
  }
}
  `
    )
    .setVariables<GetSuggestedActionsQueryVariables>({})
    .send<GetSuggestedActionsQuery>();

  return res.data.getMyRecommendedAction;
};

export const useGetPeronalizedActionsQuery = () =>
  useQuery(
    getPeronalizedActionsQueryKey(),
    () => getPeronalizedActionsQueryFetcher(),
    { cacheTime: 0 }
  );
