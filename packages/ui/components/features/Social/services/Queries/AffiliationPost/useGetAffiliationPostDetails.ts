import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import { useQuery } from "react-query";
import {
  AffiliationPost,
  GetAffiliationPostInput,
  Profile,
} from "@features/API";
import { Affiliation } from "@features/API";
import { Account } from "@features/API";

export type GetAffiliationPostDetailsQueryVariables = Exact<{
  args: GetAffiliationPostInput;
}>;

export type GetAffiliationPostDetailsQuery = { __typename?: "Query" } & {
  getAffiliationPost: { __typename?: "AffiliationPost" } & Pick<
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
    };
};

export const useGetAffiliationPostQuery = (args: GetAffiliationPostInput) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getAffiliationPostDetails(
        $args:GetAffiliationPostInput!
    ){
        getAffiliationPost(
            args:$args
        ){
            id
            userId
            affiliationId
            affiliation {
                id
            }
            comments
            reactionNum
            shares
            views
            createdAt
            user{
                id
                profile{
                    id
                    profession
                    photo
                    verified
                    username
                }
            }
        }
    }
    `);

  client.setVariables<GetAffiliationPostDetailsQueryVariables>({
    args,
  });

  return useQuery(["get-affiliation-post-details"], async () => {
    const res = await client.send<GetAffiliationPostDetailsQuery>();
    return res.data.getAffiliationPost;
  });
};
