import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import {
  AffiliationPost,
  AffiliationStatus,
  GetUserAffiliationPostsInput,
  PresentationType,
  Profile,
} from "@features/API";
import { Affiliation } from "@features/API";
import { Account } from "@features/API";
import { useQuery, UseQueryOptions } from "react-query";
import { random } from "lodash";
import { getRandomImage } from "@UI/placeholder";

export type GetProfileAffiliationPostsQueryVariables = Exact<{
  args: GetUserAffiliationPostsInput;
}>;

export type GetProfileAffiliationPostsQuery = { __typename?: "Query" } & {
  getAuthorAffiliationPosts: Array<
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

export const useGetProfileAffiliationPosts = (
  args: GetUserAffiliationPostsInput,
  opts?: UseQueryOptions<
    unknown,
    unknown,
    GetProfileAffiliationPostsQuery["getAuthorAffiliationPosts"],
    any
  >
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getProfileAffiliationPosts(
        $args:GetUserAffiliationPostsInput!
    ){
        getAuthorAffiliationPosts(
            args:$args
        ) {
            affiliation {
              id
              commision
              createdAt
              itemId
              itemType
              product
              service
              status
            }
            id
            affiliationId
            comments
            reactionNum
            shares
            userId
            createdAt
            views
            user {
                id
                profile {
                    id
                    photo
                    username
                    followers
                    verified
                    ownerId
                    profession
                }
            }

        }
    }
    `);

  client.setVariables<GetProfileAffiliationPostsQueryVariables>({
    args,
  });

  return useQuery(
    ["get-profile-affiliation-posts", { args }],
    async () => {
      const res = await client.send<GetProfileAffiliationPostsQuery>();

      return res.data.getAuthorAffiliationPosts;
    },
    opts
  );
};
