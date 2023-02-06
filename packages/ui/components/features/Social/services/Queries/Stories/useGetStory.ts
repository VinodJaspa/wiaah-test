import { Attachment, Exact, Maybe, Scalars, Story } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetStoryByIdQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetStoryByIdQuery = { __typename?: "Query" } & {
  getStory: { __typename?: "Story" } & Pick<
    Story,
    "id" | "type" | "content"
  > & {
      attachements?: Maybe<
        { __typename?: "Attachment" } & Pick<Attachment, "src" | "type">
      >;
    };
};

export const useGetStoryQuery = (id: string) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getStoryById(
  $id:String!
){
  getStory(
    storyId:$id
  ){
    id
    type
    attachements {
      src
      type
    }
    content
  }
}
    `);

  client.setVariables<GetStoryByIdQueryVariables>({
    id,
  });

  return useQuery(["story", { id }], async () => {
    const res = await client.send<GetStoryByIdQuery>();

    return res.data.getStory;
  });
};
