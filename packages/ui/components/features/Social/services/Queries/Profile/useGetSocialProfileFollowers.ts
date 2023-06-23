import { createGraphqlRequestClient } from "api";
import { Exact } from "types";
import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useQuery,
} from "react-query";
import {
  GetProfileFollowersMetaCursorInput,
  GetProfileFollowersMetaInput,
  ProfileMeta,
  ProfileMetaPaginatedResponse,
} from "@features/API";

export type GetProfileFollowersQueryVariables = Exact<{
  args: GetProfileFollowersMetaInput;
}>;

export type GetProfileFollowersQuery = { __typename?: "Query" } & {
  getFollowersByProfileId: {
    __typename?: "ProfileMetaPaginatedResponse";
  } & Pick<ProfileMetaPaginatedResponse, "hasMore" | "total"> & {
      data: Array<
        { __typename?: "ProfileMeta" } & Pick<
          ProfileMeta,
          "id" | "photo" | "username"
        >
      >;
    };
};

export const useGetSocialProfileFollowers = (
  args: GetProfileFollowersMetaInput
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getProfileFollowers(
        $args:GetProfileFollowersMetaInput!
    ) {
        getFollowersByProfileId(
            getFollowersMetaInput:$args
        ){
            data{
                id
                photo
                username
            }
            hasMore
            total
        }
    }
    `);

  client.setVariables<GetProfileFollowersQueryVariables>({
    args,
  });

  return useQuery(["social-profile-followers", { args }], async () => {
    const res = await client.send<GetProfileFollowersQuery>();

    return res.data.getFollowersByProfileId;
  });
};

export type GetProfileFollowersWithCursorQuery = {
  __typename?: "Query";
  getCursorPaginationFollowersByProfileId: {
    __typename?: "ProfileMetaCursorPaginatedResponse";
    hasMore: boolean;
    total: number;
    nextCursor?: string | null;
    cursor?: string | null;
    data: Array<{
      __typename?: "Profile";
      id: string;
      photo: string;
      username: string;
      verified: boolean;
      newStory: boolean;
      ownerId: string;
    }>;
  };
};
export type GetProfileFollowersQueryCursorVariables = Exact<{
  args: GetProfileFollowersMetaCursorInput;
}>;

type args = GetProfileFollowersQueryCursorVariables["args"];

export const useGetSocialProfileFollowersInfiniteQuery = (
  args: args,
  options?: UseInfiniteQueryOptions<
    GetProfileFollowersWithCursorQuery["getCursorPaginationFollowersByProfileId"],
    unknown,
    GetProfileFollowersWithCursorQuery["getCursorPaginationFollowersByProfileId"],
    GetProfileFollowersWithCursorQuery["getCursorPaginationFollowersByProfileId"],
    any
  >
) =>
  useInfiniteQuery(
    ["social-profile-followers-infinite", { args }],
    async ({ pageParam }) => {
      const client = createGraphqlRequestClient();

      const res = await client
        .setQuery(
          `query getProfileFollowersWithCursor(
  $args: GetProfileFollowersMetaCursorInput!
) {
  getCursorPaginationFollowersByProfileId(getFollowersMetaInput: $args) {
    data {
      id
      photo
      username
      ownerId
      newStory
      verified
    }
    hasMore
    total
    nextCursor
    cursor
  }
}
`
        )
        .setVariables<GetProfileFollowersQueryCursorVariables>({
          args: { ...args, cursor: pageParam },
        })
        .send<GetProfileFollowersWithCursorQuery>();

      return res.data.getCursorPaginationFollowersByProfileId;
    },
    options
  );
