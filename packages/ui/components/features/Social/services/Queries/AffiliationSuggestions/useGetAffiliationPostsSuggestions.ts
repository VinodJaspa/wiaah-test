import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import { useQuery } from "react-query";
import {
  AffiliationPost,
  GetRecommendedAffiliationPostsInput,
  PostLocation,
  Profile,
} from "@features/Social/services/types";
import { Affiliation } from "@features/Affiliation";
import { Account } from "@features/Accounts";

export type GetAffiliationPostSuggestionsQueryVariables = Exact<{
  args: GetRecommendedAffiliationPostsInput;
}>;

export type GetAffiliationPostSuggestionsQuery = { __typename?: "Query" } & {
  getRecommendedAffiliationPosts: Array<
    { __typename?: "AffiliationPost" } & Pick<
      AffiliationPost,
      | "id"
      | "userId"
      | "affiliationId"
      | "views"
      | "reactionNum"
      | "shares"
      | "comments"
      | "createdAt"
    > & {
        location?: Maybe<
          { __typename?: "PostLocation" } & Pick<
            PostLocation,
            "address" | "city" | "country" | "state"
          >
        >;
        affiliation: { __typename?: "Affiliation" } & Pick<
          Affiliation,
          | "id"
          | "commision"
          | "createdAt"
          | "itemId"
          | "itemType"
          | "product"
          | "service"
          | "status"
        >;
        user?: Maybe<
          { __typename?: "Account" } & Pick<Account, "id"> & {
              profile?: Maybe<
                { __typename?: "Profile" } & Pick<
                  Profile,
                  | "id"
                  | "username"
                  | "followers"
                  | "verified"
                  | "photo"
                  | "ownerId"
                  | "profession"
                >
              >;
            }
        >;
      }
  >;
};

export const useGetAffiliationPostsSuggestions = (
  args: GetRecommendedAffiliationPostsInput
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getAffiliationPostSuggestions(
            $args:GetRecommendedAffiliationPostsInput!
        ){
            getRecommendedAffiliationPosts(
                args:$args
            ){
                id
                affiliationId
                userId
                comments
                reactionNum
                shares
                views
                location{
                    address
                    city
                    country
                    state
                }
                affiliation {
                    id
                }
                user {
                    id
                    profile {
                        id
                        username
                        photo
                        verified
                        profession
                    }
                }
            }
        }
    `);

  client.setVariables<GetAffiliationPostSuggestionsQueryVariables>({
    args,
  });

  return useQuery(["affiliation-posts-suggestions", { args }], async () => {
    const res = await client.send<GetAffiliationPostSuggestionsQuery>();

    return res.data.getRecommendedAffiliationPosts;
  });
};
