import {
  Account,
  Exact,
  GetFilteredNewsletterInput,
  NewsletterSubscriber,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetNewsletterSubscribersQueryVariables = Exact<{
  args: GetFilteredNewsletterInput;
}>;

export type AdminGetNewsletterSubscribersQuery = { __typename?: "Query" } & {
  getNewletterSubscribers: Array<
    { __typename?: "NewsletterSubscriber" } & Pick<
      NewsletterSubscriber,
      "ownerId"
    > & {
        user: { __typename?: "Account" } & Pick<
          Account,
          "firstName" | "lastName" | "email"
        >;
      }
  >;
};

type args = AdminGetNewsletterSubscribersQueryVariables["args"];
export const adminGetNewsletterSubscribersQueryKey = (args: args) => [
  "admin-newsletter-subscribers",
  { args },
];

export const adminGetNewsletterSubscribersQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetNewsletterSubscribers($args:GetFilteredNewsletterInput!){
  getNewletterSubscribers(
    args:$args
  ) {
    user{
      firstName
      lastName
      email
    }
    ownerId
  }
}
  `);

  const res = await client
    .setVariables<AdminGetNewsletterSubscribersQueryVariables>({ args })
    .send<AdminGetNewsletterSubscribersQuery>();

  return res.data.getNewletterSubscribers;
};

export const useAdminGetNewsletterSubscribersQuery = (args: args) =>
  useQuery(adminGetNewsletterSubscribersQueryKey(args), () =>
    adminGetNewsletterSubscribersQueryFetcher(args)
  );
