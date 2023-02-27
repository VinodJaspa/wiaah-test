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
      const ph: GetProfileAffiliationPostsQuery["getAuthorAffiliationPosts"] = [
        ...Array(30),
      ].map((_, i) => ({
        id: i.toString(),
        affiliationId: i.toString(),
        comments: random(150),
        reactionNum: random(16512),
        views: random(13646),
        shares: random(135),
        createdAt: new Date().toString(),
        userId: i.toString(),
        user: {
          id: i.toString(),
          profile: {
            followers: random(134),
            id: i.toString(),
            ownerId: i.toString(),
            photo: "/profile (4).jfif",
            profession: "profession",
            username: "user's name",
            verified: true,
          },
        },
        affiliation: {
          commision: random(50),
          createdAt: new Date().toString(),
          id: i.toString(),
          itemId: i.toString(),
          itemType: "product",
          status: AffiliationStatus.Active,
          product: {
            title: "test",
            thumbnail: getRandomImage(),
            presentations: [
              { src: getRandomImage(), type: PresentationType.Image },
            ],
          },
        },
      }));

      return ph;

      const res = await client.send<GetProfileAffiliationPostsQuery>();

      return res.data.getAuthorAffiliationPosts;
    },
    opts
  );
};
