import { createGraphqlRequestClient } from "api";
import { Exact, Maybe, Scalars } from "types";
import { useQuery, UseQueryOptions } from "react-query";
import { Profile, Story } from "@features/API";

export type GetProfileStoryQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetProfileStoryQuery = { __typename?: "Query" } & {
  getUserStory: { __typename?: "Story" } & Pick<
    Story,
    | "id"
    | "content"
    | "createdAt"
    | "publisherId"
    | "reactionsNum"
    | "type"
    | "updatedAt"
    | "viewsCount"
  > & {
      publisher?: Maybe<
        { __typename?: "Profile" } & Pick<
          Profile,
          "photo" | "username" | "visibility" | "id"
        >
      >;
    };
};

export const useGetProfileStory = (
  profileId: string,
  opts?: UseQueryOptions<
    GetProfileStoryQueryVariables,
    unknown,
    GetProfileStoryQuery["getUserStory"]
  >
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getProfileStory(
            $id:String!
        ){
            getUserStory(
                userId:$id
            ){
                id
                content
                createdAt
                publisherId
                reactionsNum
                type
                updatedAt
                viewsCount
                publisher {
                    id
                    photo
                    username
                    visibility
                }
            }
        }
    `);

  client.setVariables<GetProfileStoryQueryVariables>({
    id: profileId,
  });

  return useQuery(["get-profile-story", { profileId }], async () => {
    const res = await client.send<GetProfileStoryQuery>();

    return res.data.getUserStory;
  });
};
