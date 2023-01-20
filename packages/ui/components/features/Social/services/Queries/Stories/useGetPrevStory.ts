import { Exact, Scalars } from "types";
import { createGraphqlRequestClient } from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { Story } from "@features/Social/services/types";

export type GetPrevStoryQueryVariables = Exact<{
  storyId: Scalars["String"];
}>;

export type GetPrevStoryQuery = { __typename?: "Query" } & {
  getUserPrevStory: { __typename?: "Story" } & Pick<
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

export const useGetPrevStory = (
  storyId: string,
  opts?: UseQueryOptions<
    GetPrevStoryQueryVariables,
    unknown,
    GetPrevStoryQuery["getUserPrevStory"]
  >
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getPrevStory(
        $storyId:String!
    ){
        getUserPrevStory(
            storyId:$storyId
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

  client.setVariables<GetPrevStoryQueryVariables>({
    storyId,
  });

  return useQuery(
    ["get-prev-story", storyId],
    async () => {
      const res = await client.send<GetPrevStoryQuery>();
      return res.data.getUserPrevStory;
    },
    { enabled: !!storyId }
  );
};
