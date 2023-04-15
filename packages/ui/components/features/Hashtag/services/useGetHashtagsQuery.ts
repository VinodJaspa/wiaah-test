import { createGraphqlRequestClient } from "api";
import { Exact, GetAddableHashtagsInput, Hashtag } from "@features/API";
import { useQuery } from "react-query";

export type GetHashtagsQueryVariables = Exact<{
  args: GetAddableHashtagsInput;
}>;

export type GetHashtagsQuery = { __typename?: "Query" } & {
  getAddableHashtags: Array<
    { __typename?: "Hashtag" } & Pick<Hashtag, "id" | "tag" | "usage">
  >;
};

export const useGetHashtagsQuery = (args: GetHashtagsQueryVariables) => {
  return useQuery(["get-hashtags", { args }], async () => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
query getHashtags($args:GetAddableHashtagsInput!){
    getAddableHashtags (args:$args) {
        id
        tag
        usage
    }
}
`);

    const res = await client
      .setVariables<GetHashtagsQueryVariables>(args)
      .send<GetHashtagsQuery>();

    return res.data.getAddableHashtags;
  });
};
