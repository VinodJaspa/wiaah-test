import { Exact } from "types";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import {
  ActiveStatus,
  Profile,
  ProfileVisibility,
  VisibilityEnum,
} from "@features/API";
import { isDev } from "@UI/../utils/src";

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
    if (isDev) {
      return {
        id: "",
        activeStatus: ActiveStatus.Active,
        bio: "My Social Profile Bio",
        createdAt: new Date(2023, 1, 1, 1).toString(),
        followers: 150,
        following: 150,
        lastActive: new Date().toString(),
        ownerId: "",
        photo: "/profile (4).jfif",
        profession: "prof",
        publications: 150,
        updatedAt: new Date().toString(),
        username: "name",
        verified: true,
        visibility: ProfileVisibility.Public,
      } as GetMyProfileQuery["myProfile"];
    }

    const res = await client.send<GetMyProfileQuery>();

    return res.data.myProfile;
  });
};
