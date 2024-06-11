import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import { useQuery } from "react-query";
import {
  AffiliationPost,
  GetRecommendedAffiliationPostsInput,
  PostLocation,
  Profile,
} from "@features/API";
import { Affiliation } from "@features/API";
import { Account } from "@features/API";

export type GetAffiliationPostSuggestionsQueryVariables = Exact<{
  args: GetRecommendedAffiliationPostsInput;
}>;

export type GetAffiliationPostSuggestionsQuery = { __typename?: "Query" } & {
  getRecommendedAffiliationPosts: Array<
    Pick<
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
      affiliation: Pick<
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
      user: {
        profile: Pick<
          Profile,
          "id" | "username" | "verified" | "photo" | "ownerId"
        >;
      };
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
