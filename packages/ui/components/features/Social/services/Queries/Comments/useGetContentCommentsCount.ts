import { createGraphqlRequestClient } from "api";
import { isDev } from "@UI/../utils/src";
import { ContentHostType, Exact, Query, Scalars } from "@features/API";
import { UseQueryOptions, useQuery } from "react-query";

export type GetContentCommentsCountQueryVariables = Exact<{
  id: Scalars["String"]["input"];
  type: ContentHostType;
}>;

export type GetContentCommentsCountQuery = { __typename?: "Query" } & Pick<
  Query,
  "getContentCommentsCount"
>;
type args = GetContentCommentsCountQueryVariables;

export const getContentCommentsQueryKey = (args: args) => [
  "content-comments",
  { args },
];

export const getContentCommentsQueryFetcher = async (args: args) => {
  if (isDev) {
    const mockRes: GetContentCommentsCountQuery["getContentCommentsCount"] = 150;

    return mockRes;
  }

  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
  query getContentCommentsCount($id:String!, $type:ContentHostType!){
  getContentCommentsCount(id:$id,type:$type)
}
  `,
    )
    .setVariables<GetContentCommentsCountQueryVariables>(args)
    .send<GetContentCommentsCountQuery>();

  return res.data.getContentCommentsCount;
};

export const useGetContentCommentsCountQuery = (
  args: args,
  options?: UseQueryOptions<
    GetContentCommentsCountQuery["getContentCommentsCount"],
    unknown,
    GetContentCommentsCountQuery["getContentCommentsCount"],
    any
  >,
) =>
  useQuery(
    getContentCommentsQueryKey(args),
    () => getContentCommentsQueryFetcher(args),
    options,
  );
