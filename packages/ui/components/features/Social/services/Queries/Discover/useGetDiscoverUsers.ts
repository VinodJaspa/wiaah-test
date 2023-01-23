import { Exact, Maybe } from "types";
import { createGraphqlRequestClient } from "api";
import {
  GetMyFriendSuggestionsInput,
  Profile,
} from "@features/Social/services/types";
import { Account } from "@features/Accounts";
import { useQuery } from "react-query";

export type GetDiscoverUsersQueryVariables = Exact<{
  args: GetMyFriendSuggestionsInput;
}>;

export type GetDiscoverUsersQuery = { __typename?: "Query" } & {
  getMyFriendSuggestions: { __typename?: "FriendSuggestion" } & {
    accounts: Array<
      { __typename?: "Account" } & Pick<Account, "id"> & {
          profile?: Maybe<
            { __typename?: "Profile" } & Pick<
              Profile,
              | "id"
              | "username"
              | "photo"
              | "profession"
              | "followers"
              | "verified"
            >
          >;
        }
    >;
  };
};

export const useGetDiscoverUsers = (args: GetMyFriendSuggestionsInput) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getDiscoverUsers(
            $args:GetMyFriendSuggestionsInput!
        ){
            getMyFriendSuggestions(
                args:$args
            ){
                accounts{
                    id
                    profile{
                        id
                        username
                        photo
                        profession
                        followers
                        verified
                    }
                }
            }
        }
    `);

  client.setVariables<GetDiscoverUsersQueryVariables>({
    args,
  });

  return useQuery(["get-friends-suggestion", { args }], async () => {
    const res = await client.send<GetDiscoverUsersQuery>();

    return res.data.getMyFriendSuggestions;
  });
};
