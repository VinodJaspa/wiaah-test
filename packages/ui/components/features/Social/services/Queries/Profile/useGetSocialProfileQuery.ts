import { createGraphqlRequestClient } from "api";
import { Exact, Maybe, Scalars } from "types";
import {
  AccountType,
  ActiveStatus,
  Profile,
  ProfileVisibility,
  Query,
  Shop,
  StoreType,
} from "@features/API";
import { Account } from "@features/API";
import { useQuery } from "react-query";
// import { isDev } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";

const isDev = true;

export type GetProfileByIdQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export const getProfileByIdQueryKey = (id: GetProfileByIdQueryVariables) => [
  "get-my-newsfeed-posts",
  id,
];

export type GetProfileByIdQuery = {
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
      { __typename?: "Account" } & Pick<
        Account,
        "id" | "verified" | "accountType"
      > & {
        shop: { __typename?: "Shop" } & Pick<
          Shop,
          "type" | "storeType" | "id"
        >;
      }
    >;
  } & { __typename?: "Query" } & Pick<Query, "isFollowed">;
};

export const getSocialProfileFetcher = (
  id: GetProfileByIdQueryVariables["id"]
) => {
  const mockRes: GetProfileByIdQuery["getProfile"] = {
    id: "",
    activeStatus: ActiveStatus.Active,
    bio: "My Social Profile Bio",
    createdAt: new Date().toISOString(),
    followers: 150,
    following: 150,
    lastActive: new Date().toISOString(),
    ownerId: "",
    photo: getRandomImage(),
    profession: "prof",
    publications: 150,
    updatedAt: new Date().toISOString(),
    username: "Nike",
    verified: true,
    visibility: ProfileVisibility.Private,
    isFollowed: true,
    user: {
      shop: {
        id: "",
        storeType: StoreType.Product,
      },
      accountType: AccountType.Seller,
      id: "",
      verified: true,
    },
  };
  return mockRes;
};

export const useGetSocialProfileQuery = (id: string) => {
  const client = createGraphqlRequestClient();
  client.setQuery(`

  query getProfileById($id: String!) {
    getProfile(id: $id) {
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
        shop {
          id
          storeType
        }
        id
        verified
        accountType
      }
    }
    isFollowed(profileId: $id)
  }
`);

  client.setVariables<GetProfileByIdQueryVariables>({ id });

  return useQuery(["getProfilById", id], async () => {
    if (isDev) {
      return {
        id: "",
        activeStatus: ActiveStatus.Active,
        bio: "My Social Profile Bio",
        createdAt: new Date().toISOString(),
        followers: 150,
        following: 150,
        lastActive: new Date().toISOString(),
        ownerId: "",
        photo: getRandomImage(),
        profession: "prof",
        publications: 150,
        updatedAt: new Date().toISOString(),
        username: "Nike",
        verified: true,
        visibility: ProfileVisibility.Private,
        isFollowed: true,
        user: {
          shop: {
            id: "",
            storeType: StoreType.Product,
          },
          accountType: AccountType.Seller,
          id: "",
          verified: true,
        },
      } as GetProfileByIdQuery["getProfile"];
    }

    const response = await client.send<GetProfileByIdQuery>();
    return response.data.getProfile;
  });
};
