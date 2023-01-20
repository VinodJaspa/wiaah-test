import { createGraphqlRequestClient } from "api";
import { Exact, Scalars } from "types";
import { useQuery, UseQueryOptions } from "react-query";
import { Story } from "@features/Social/services/types";

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
  >;
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
