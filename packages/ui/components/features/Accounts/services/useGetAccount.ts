import {
  Account,
  AccountType,
  Exact,
  Maybe,
  Profile,
  Scalars,
} from "../../../features/API";
import { isDev } from "utils";
import { createGraphqlRequestClient } from "api";
import { useQuery, UseQueryOptions } from "react-query";

export type AdminGetAccountQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type AdminGetAccountQuery = { __typename?: "Query" } & {
  adminGetAccount: { __typename?: "Account" } & Pick<
    Account,
    "firstName" | "email" | "lastName" | "accountType" | "photo"
  > & {
    profile?: Maybe<{ __typename?: "Profile" } & Pick<Profile, "username">>;
  };
};

export const useAdminGetAccount = (
  accountId: string,
  options?: UseQueryOptions<
    any,
    any,
    AdminGetAccountQuery["adminGetAccount"],
    any
  >,
) => {
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
    accountType
    photo
  }
}
  `);

  return useQuery(
    ["admin-get-account", { accountId }],
    async () => {
      if (isDev) {
        const res: AdminGetAccountQuery["adminGetAccount"] = {
          accountType: AccountType.Seller,
          email: "example@email.com",
          firstName: "first name",
          lastName: "last name",
        };

        return res;
      }
      const res = await client
        .setVariables<AdminGetAccountQueryVariables>({
          id: accountId,
        })
        .send<AdminGetAccountQuery>();

      return res.data.adminGetAccount;
    },
    options,
  );
};
