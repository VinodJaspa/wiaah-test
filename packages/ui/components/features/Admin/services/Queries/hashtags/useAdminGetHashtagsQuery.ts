import { Exact, GetFilteredHashtagsInput, Hashtag } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetHashtagsQueryVariables = Exact<{
  args: GetFilteredHashtagsInput;
}>;

export type AdminGetHashtagsQuery = { __typename?: "Query" } & {
  adminGetHashtag: Array<
    { __typename?: "Hashtag" } & Pick<
      Hashtag,
      "id" | "tag" | "createdAt" | "updatedAt" | "usage"
    >
  >;
};

type args = AdminGetHashtagsQueryVariables["args"];

export const adminGetHashtagsQueryKey = (args: args) => [
  "admin-get-hashtag",
  { args },
];

export const adminGetHashtagsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(``);

  const res = await client
    .setVariables<AdminGetHashtagsQueryVariables>({
      args,
    })
    .send<AdminGetHashtagsQuery>();

  return res.data.adminGetHashtag;
};

export const useAdminGetHashtagsQuery = (args: args) =>
  useQuery(adminGetHashtagsQueryKey(args), () =>
    adminGetHashtagsQueryFetcher(args)
  );
