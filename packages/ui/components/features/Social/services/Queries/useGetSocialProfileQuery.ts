import { createGraphqlRequestClient } from "api";
import { Exact, Scalars } from "types";
import { Profile, Query } from "@features/Social";
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
    >;
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
      ...(res.data.getProfile || {}),
      isFollowed: res.data.isFollowed || false,
    };
  });
};
