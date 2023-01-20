import { createGraphqlRequestClient } from "@UI/../api";
import { Exact } from "types";
import {
  GetProfileFollowersMetaInput,
  ProfileMeta,
  ProfileMetaPaginatedResponse,
} from "@features/Social";
import { useQuery } from "react-query";

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
