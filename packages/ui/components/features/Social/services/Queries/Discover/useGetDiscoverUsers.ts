import { Exact, Maybe } from "types";
import { createGraphqlRequestClient } from "api";
import { GetMyFriendSuggestionsInput, Location, Profile } from "@features/API";
import { Account } from "@features/API";
import { useQuery } from "react-query";
import { getRandomName, isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";

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
            > & {
                location: Pick<Location, "city" | "country">;
              }
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
    if (isDev) {
      const mockRes: GetDiscoverUsersQuery["getMyFriendSuggestions"] = {
        accounts: [...Array(15)].map(() => ({
          id: "",
          profile: {
            followers: randomNum(150),
            id: "",
            photo: getRandomImage(),
            profession: "profession",
            username: getRandomName().firstName,
            verified: true,
            location: {
              city: "Lyons",
              country: "Colorado",
            },
          },
        })),
      };

      return mockRes;
    }

    const res = await client.send<GetDiscoverUsersQuery>();

    return res.data.getMyFriendSuggestions;
  });
};
