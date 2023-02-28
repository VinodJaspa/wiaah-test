import { Account, Exact, Maybe, Profile, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetAccountQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type AdminGetAccountQuery = { __typename?: "Query" } & {
  adminGetAccount: { __typename?: "Account" } & Pick<
    Account,
    "firstName" | "email" | "lastName" | "type" | "photo"
  > & {
      profile?: Maybe<{ __typename?: "Profile" } & Pick<Profile, "username">>;
    };
};

export const useGetAccount = (accountId: string) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetAccount($id:String!){
  adminGetAccount(id:$id) {
    firstName
    email
    lastName
    profile{
      username
    }
    type
    photo
  }
}
  `);

  return useQuery(["admin-get-account", { accountId }], async () => {
    const res = await client
      .setVariables<AdminGetAccountQueryVariables>({
        id: accountId,
      })
      .send<AdminGetAccountQuery>();

    return res.data.adminGetAccount;
  });
};
