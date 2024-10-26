import {
  Exact,
  GetRecentStoriesInput,
  Profile,
  RecentStory,
} from "@features/API";
import { Account } from "@features/API";
import { getRandomName, isDev } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { createGraphqlRequestClient } from "@UI/../api";

export type GetRecentStoriesQueryVariables = Exact<{
  args: GetRecentStoriesInput;
}>;

export type GetRecentStoriesQuery = { __typename?: "Query" } & {
  getRecentStories: Array<
    { __typename?: "RecentStory" } & Pick<
      RecentStory,
      "newStory" | "userId"
    > & {
      user: { __typename?: "Account" } & Pick<Account, "id"> & {
        profile: { __typename?: "Profile" } & Pick<
          Profile,
          "id" | "photo" | "profession" | "username"
        >;
      };
    }
  >;
};

export const useGetRecentStories = (input: GetRecentStoriesInput) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getRecentStories(
            $args:GetRecentStoriesInput!
        ){
            getRecentStories(
                getRecentStoryInput:$args
            ){
                newStory
                userId
                user{
                    id
                    profile{
                        id
                        photo
                        profession
                        username
                    }
                }
            }
        }
    `);

  client.setVariables<GetRecentStoriesQueryVariables>({
    args: input,
  });

  // State to hold data
  const [data, setData] = useState<GetRecentStoriesQuery["getRecentStories"]>(
    [],
  );

  // Generate random mock data only on client-side in development
  useEffect(() => {
    if (isDev && typeof window !== "undefined") {
      setData(
        [...Array(10)].map(() => ({
          userId: "teasd",
          newStory: true,
          user: {
            id: "Teasd",
            profile: {
              id: "Teasd",
              photo: getRandomImage(),
              profession: "prof",
              username: `${getRandomName().firstName} ${getRandomName().lastName}`,
            },
          },
        })),
      );
    }
  }, []);

  // Main query using react-query
  return useQuery(
    ["recent-story", { input }],
    async () => {
      if (isDev && typeof window !== "undefined") {
        // Return the mock data generated above during development
        return data;
      }

      const res = await client.send<GetRecentStoriesQuery>();
      return res.data.getRecentStories;
    },
    {
      // Return the mock data initially during SSR to avoid hydration issues
      initialData: isDev
        ? [...Array(10)].map(() => ({
          userId: "staticUserId",
          newStory: true,
          user: {
            id: "staticUserId",
            profile: {
              id: "staticProfileId",
              photo: "/static/path/to/image.jpg",
              profession: "static profession",
              username: "Static Name",
            },
          },
        }))
        : undefined,
    },
  );
};
