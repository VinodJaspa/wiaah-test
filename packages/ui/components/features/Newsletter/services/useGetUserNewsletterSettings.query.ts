import { createGraphqlRequestClient } from "api";
import { Exact, NewsletterSettings, Scalars } from "@features/API";
import { UseQueryOptions, useQuery } from "react-query";

export type GetUserNewsletterSettingsQueryVariables = Exact<{
  userId: Scalars["String"]["input"];
}>;

export type GetUserNewsletterSettingsQuery = { __typename?: "Query" } & {
  getUserNewsletterSettings: { __typename?: "NewsletterSettings" } & Pick<
    NewsletterSettings,
    "feedback" | "news" | "product" | "reminder"
  >;
};

type args = GetUserNewsletterSettingsQueryVariables;
export const getUserNewsletterSettingsQueryKey = (args: args) => [
  "get-user-newsletter-settings",
  { args },
];

export const getUserNewsletterSettingsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();
  const res = await client
    .setQuery(
      `
  query getUserNewsletterSettings($userId:String!){
  getUserNewsletterSettings(accountId:$userId) {
    feedback
    news
    product
    reminder
  }
}
  `,
    )
    .setVariables<GetUserNewsletterSettingsQueryVariables>(args)
    .send<GetUserNewsletterSettingsQuery>();

  return res.data.getUserNewsletterSettings;
};

export const useGetUserNewsletterSettingsQuery = (
  args: args,
  options?: UseQueryOptions<
    GetUserNewsletterSettingsQuery["getUserNewsletterSettings"],
    any,
    GetUserNewsletterSettingsQuery["getUserNewsletterSettings"],
    any
  >,
) =>
  useQuery(
    getUserNewsletterSettingsQueryKey(args),
    () => getUserNewsletterSettingsQueryFetcher(args),
    options,
  );
