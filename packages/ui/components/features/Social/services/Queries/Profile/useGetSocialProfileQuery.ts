import { createGraphqlRequestClient } from "api";
import { Exact, Maybe, Scalars } from "types";
import { Profile, Query } from "@features/API";
import { Account } from "@features/API";
import { useQuery } from "react-query";

export type GetProfileByIdQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetProfileByIdQuery = { __typename?: "Query" } & Pick<
  Query,
  "isFollowed"
> & {
    getProfile: { __typename?: "Profile" } & Pick<
      Profile,
      | "activeStatus"
      | "bio"
      | "createdAt"
      | "followers"
      | "following"
      | "id"
      | "lastActive"
      | "ownerId"
      | "photo"
      | "profession"
      | "publications"
      | "updatedAt"
      | "username"
      | "visibility"
      | "verified"
    > & {
        user?: Maybe<
          { __typename?: "Account" } & Pick<Account, "id" | "verified" | "type">
        >;
      };
  };

export const useGetSocialProfileQuery = (id: string) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
  query getProfileById(
      $id:String!
  ){
      getProfile(
          id:$id
      ){
          activeStatus
          bio
          createdAt
          followers
          following
          id
          lastActive
          ownerId
          photo
          profession
          publications
          updatedAt
          username
          visibility
          verified
          user {
            id
            verified
            type
          }
      }
      
      isFollowed(
          profileId:$id
      )
    }     
    `);

  client.setVariables<GetProfileByIdQueryVariables>({
    id,
  });

  return useQuery(["get-profile-by-id", { id }], async () => {
    const res = await client.send<GetProfileByIdQuery>();

    return {
      ...res.data.getProfile,
      isFollowed: res.data.isFollowed || false,
    };
  });
};
