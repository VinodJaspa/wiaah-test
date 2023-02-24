import { AdminGetLanguagesInput, Exact, Language } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetLanguagesQueryVariables = Exact<{
  args: AdminGetLanguagesInput;
}>;

export type AdminGetLanguagesQuery = { __typename?: "Query" } & {
  adminGetLanguages: Array<
    { __typename?: "Language" } & Pick<
      Language,
      "name" | "id" | "code" | "enabled" | "locale" | "sortOrder"
    >
  >;
};

type args = AdminGetLanguagesQueryVariables["args"];
export const adminGetLanguagesQueryKey = (args: args) => [
  "admin-get-languages",
  { args },
];

export const adminGetLanguagesQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetLanguages{
  adminGetLanguages{
    name
    id
    code
    enabled
    locale
    sortOrder
  }
}
  `);

  const res = await client
    .setVariables<AdminGetLanguagesQueryVariables>({
      args,
    })
    .send<AdminGetLanguagesQuery>();

  return res.data.adminGetLanguages;
};

export const useAdminGetLanguagesQuery = (args: args) =>
  useQuery(adminGetLanguagesQueryKey(args), () =>
    adminGetLanguagesQueryFetcher(args)
  );
