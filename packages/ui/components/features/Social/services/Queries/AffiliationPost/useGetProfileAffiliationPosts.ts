import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import {
  AffiliationPost,
  GetUserAffiliationPostsInput,
  Profile,
} from "@features/Social/services/types";
import { Affiliation } from "@features/Affiliation";
import { Account } from "@features/Accounts";
import { useQuery } from "react-query";

export type GetProfileAffiliationPostsQueryVariables = Exact<{
  args: GetUserAffiliationPostsInput;
}>;

export type GetProfileAffiliationPostsQuery = { __typename?: "Query" } & {
  getAuthorAffiliationPosts: Array<
    { __typename?: "AffiliationPost" } & Pick<
      AffiliationPost,
      "id" | "affiliationId" | "comments" | "reactionNum" | "shares" | "userId"
    > & {
        affiliation: { __typename?: "Affiliation" } & Pick<Affiliation, "id">;
        user?: Maybe<
          { __typename?: "Account" } & Pick<Account, "id"> & {
              profile?: Maybe<
                { __typename?: "Profile" } & Pick<
                  Profile,
                  "id" | "photo" | "username"
                >
              >;
            }
        >;
      }
  >;
};

export const useGetProfileAffiliationPosts = (
  args: GetUserAffiliationPostsInput
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getProfileAffiliationPosts(
        $args:GetUserAffiliationPostsInput!
    ){
        getAuthorAffiliationPosts(
            args:$args
        ) {
            id
            affiliation {
                id
            }
            affiliationId
            comments
            reactionNum
            shares
            userId
            user {
                id
                profile {
                    id
                    photo
                    username
                }
            }

        }
    }
    `);

  client.setVariables<GetProfileAffiliationPostsQueryVariables>({
    args,
  });

  return useQuery(["get-profile-affiliation-posts", { args }], async () => {
    const res = await client.send<GetProfileAffiliationPostsQuery>();

    return res.data.getAuthorAffiliationPosts;
  });
};
