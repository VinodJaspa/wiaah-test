import { createGraphqlRequestClient } from "@UI/../api";
import { Exact, Maybe } from "types";
import { useQuery } from "react-query";
import {
  GetStorySeenByInput,
  StoryView,
  Story,
  Profile,
} from "@features/Social/services/types";
import { Account } from "@features/Accounts";

export type GetStoryViewersQueryVariables = Exact<{
  args: GetStorySeenByInput;
}>;

export type GetStoryViewersQuery = { __typename?: "Query" } & {
  getStoryViews: Array<
    { __typename?: "StoryView" } & Pick<
      StoryView,
      "createdAt" | "id" | "storyId" | "viewerId"
    > & {
        story?: Maybe<
          { __typename?: "Story" } & Pick<
            Story,
            | "id"
            | "content"
            | "createdAt"
            | "publisherId"
            | "reactionsNum"
            | "type"
            | "updatedAt"
            | "viewsCount"
          >
        >;
        viewer?: Maybe<
          { __typename?: "Account" } & Pick<Account, "id"> & {
              profile?: Maybe<
                { __typename?: "Profile" } & Pick<
                  Profile,
                  "ownerId" | "photo" | "profession" | "username"
                >
              >;
            }
        >;
      }
  >;
};
export const useGetMyStoryViewers = (args: GetStorySeenByInput) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getStoryViewers(  
    $args:GetStorySeenByInput!
){
    getStoryViews(
        getStoryViewsInput:$args
    ){
        createdAt
        id
        storyId
        viewerId
        story{
            id
            content
            createdAt
            publisherId
            reactionsNum
            type
            updatedAt
            viewsCount
        }
        viewer {
            id
            profile {
                ownerId
                photo
                profession
                username
            }
        }
    }
}
    `);

  client.setVariables<GetStoryViewersQueryVariables>({
    args,
  });

  return useQuery(["get-my-story-viewers", { args }], async () => {
    const res = await client.send<GetStoryViewersQuery>();
    return res.data.getStoryViews;
  });
};
