import { createGraphqlRequestClient } from "api";
import { Exact } from "types";
import {
  GetProfileFollowersMetaCursorInput,
  GetProfileFollowersMetaInput,
  ProfileMeta,
  ProfileMetaPaginatedResponse,
} from "@features/API";
import { useInfiniteQuery, useQuery } from "react-query";

export type GetSocialProfileFollowingsQueryVariables = Exact<{
  args: GetProfileFollowersMetaInput;
}>;

export type GetSocialProfileFollowingsQuery = { __typename?: "Query" } & {
  getFollowingByProfileId: {
    __typename?: "ProfileMetaPaginatedResponse";
  } & Pick<ProfileMetaPaginatedResponse, "total" | "hasMore"> & {
      data: Array<
        { __typename?: "ProfileMeta" } & Pick<
          ProfileMeta,
          "id" | "photo" | "username"
        >
      >;
    };
};

export const useGetSocialProfileFollowingQuery = (
  input: GetProfileFollowersMetaInput
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getSocialProfileFollowings(
        $args:GetProfileFollowersMetaInput!
    ){
        getFollowingByProfileId(
            getFollowingMetaInput:$args
        ){
            total
            hasMore
            data {
                id
                photo
                username
            }
        }
    }
    `);

  client.setVariables<GetSocialProfileFollowingsQueryVariables>({
    args: input,
  });

  return useQuery(["get-social-profile-following", { input }], async () => {
    const res = await client.send<GetSocialProfileFollowingsQuery>();

    return res.data.getFollowingByProfileId;
  });
};

export type GetSocialProfileFollowingsWithCursorQuery = {
  __typename?: "Query";
  getCursorPaginationFollowingsByProfileId: {
    __typename?: "ProfileMetaCursorPaginatedResponse";
    total: number;
    hasMore: boolean;
    nextCursor?: string | null;
    cursor?: string | null;
    data: Array<{
      __typename?: "Profile";
      id: string;
      photo: string;
      username: string;
      newStory: boolean;
      ownerId: string;
      verified: boolean;
    }>;
  };
};

export type GetSocialProfileFollowingsWithCursorQueryVariables = Exact<{
  args: GetProfileFollowersMetaCursorInput;
}>;

type args = GetSocialProfileFollowingsWithCursorQueryVariables["args"];
export const useGetSocialProfileFollowingsInfiniteQuery = (args: args) =>
  useInfiniteQuery(
    ["get-social-profile-followings-infinite", { args }],
    async ({ pageParam }) => {
      const client = createGraphqlRequestClient();

      const res = await client
        .setQuery(
          `query getSocialProfileFollowingsWithCursor(
    $args:GetProfileFollowersMetaCursorInput!
){
    getCursorPaginationFollowingsByProfileId(
        getFollowersMetaInput:$args
    ){
        total
        hasMore
        data {
            id
            photo
            username
            newStory
            ownerId
            verified
        }
        nextCursor
        cursor
        total
    }
}`
        )
        .setVariables<GetSocialProfileFollowingsWithCursorQueryVariables>({
          args: { ...args, cursor: pageParam },
        })
        .send<GetSocialProfileFollowingsWithCursorQuery>();

      return res.data;
    }
  );
