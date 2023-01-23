import { Exact } from "types";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { Profile } from "@features/Social/services/types";

export type GetMyProfileQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyProfileQuery = { __typename?: "Query" } & {
  myProfile: { __typename?: "Profile" } & Pick<
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
  >;
};

export const useGetMyProfileQuery = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getMyProfile {
            myProfile {
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
            }
        }
    `);

  return useQuery(["my-profile"], async () => {
    const res = await client.send<GetMyProfileQuery>();

    return res.data.myProfile;
  });
};
