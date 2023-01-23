import { createGraphqlRequestClient } from "@UI/../api";
import { Exact, Maybe } from "types";
import { useQuery } from "react-query";
import {
  GetRecentStoriesInput,
  Profile,
  RecentStory,
} from "@features/Social/services/types";
import { Account } from "@features/Accounts";

export type GetRecentStoriesQueryVariables = Exact<{
  args: GetRecentStoriesInput;
}>;

export type GetRecentStoriesQuery = { __typename?: "Query" } & {
  getRecentStories: Array<
    { __typename?: "RecentStory" } & Pick<
      RecentStory,
      "newStory" | "userId"
    > & {
        user?: Maybe<
          { __typename?: "Account" } & Pick<Account, "id"> & {
              profile?: Maybe<
                { __typename?: "Profile" } & Pick<Profile, "id" | "photo">
              >;
            }
        >;
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
                    }
                }
            }
        }
    `);

  client.setVariables<GetRecentStoriesQueryVariables>({
    args: input,
  });

  return useQuery(["recent-story", { input }], async () => {
    const res = await client.send<GetRecentStoriesQuery>();
    return res.data.getRecentStories;
  });
};
