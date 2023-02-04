import { GetTopHashtagsInput, Hashtag } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { Exact } from "types";

export type GetTopHashtagsQueryVariables = Exact<{
  args: GetTopHashtagsInput;
}>;

export type GetTopHashtagsQuery = { __typename?: "Query" } & {
  getTopHashtags: Array<
    { __typename?: "Hashtag" } & Pick<Hashtag, "id" | "tag" | "usage">
  >;
};

export const useGetDiscoverHashtags = (input: GetTopHashtagsInput) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getTopHashtags(
            $args:GetTopHashtagsInput!
        ){
            getTopHashtags(
                args:$args
            ){
                id
                tag
                usage
            }
        }
    `);

  client.setVariables<GetTopHashtagsQueryVariables>({
    args: input,
  });

  return useQuery(["get-top-hashtags", { input }], async () => {
    const res = await client.send<GetTopHashtagsQuery>();

    return res.data.getTopHashtags;
  });
};
