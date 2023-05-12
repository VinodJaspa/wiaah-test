import { createGraphqlRequestClient } from "@UI/../api";
import { getRandomName, isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import {
  Action,
  ActionEffect,
  Exact,
  PostLocation,
  Profile,
} from "@features/API";
import { useQuery } from "react-query";

export type GetSuggestedActionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetSuggestedActionsQuery = { __typename?: "Query" } & {
  getMyRecommendedAction: { __typename?: "Action" } & Pick<
    Action,
    "src" | "reactionNum" | "comments" | "shares" | "id" | "music" | "tags"
  > & {
      effect: { __typename?: "ActionEffect" } & Pick<ActionEffect, "name">;
      location: { __typename?: "PostLocation" } & Pick<
        PostLocation,
        "address" | "city" | "country" | "state"
      >;
      profile: { __typename?: "Profile" } & Pick<
        Profile,
        "photo" | "username" | "verified" | "id" | "ownerId"
      >;
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
      music: "Kafir - Nile",
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
    music
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
