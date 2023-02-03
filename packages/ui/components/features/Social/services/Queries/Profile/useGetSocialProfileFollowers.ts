import { createGraphqlRequestClient } from "api";
import { Exact } from "types";
import { useQuery } from "react-query";
import {
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
