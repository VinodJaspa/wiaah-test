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
import { isDev } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";

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
            shop {
              id
              type
              storeType
            }
            id
            verified
            accountType
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
    if (isDev) {
      const mockRes = {
        id: "",
        activeStatus: ActiveStatus.Active,
        bio: "My Social Profile Bio",
        createdAt: new Date().toString(),
        followers: 150,
        following: 150,
        lastActive: new Date().toString(),
        ownerId: "",
        photo: getRandomImage(),
        profession: "prof",
        publications: 150,
        updatedAt: new Date().toString(),
        username: "Nike",
        verified: true,
        visibility: ProfileVisibility.Private,
        isFollowed: false,
        user: {
          shop: {
            id: "",
            storeType: StoreType.Product,
          },
          accountType: AccountType.Seller,
          id: "",
          verified: true,
        },
      } as GetProfileByIdQuery["getProfile"] & {
        isFollowed: GetProfileByIdQuery["isFollowed"];
      };

      return mockRes;
    }

    const res = await client.send<GetProfileByIdQuery>();

    return {
      ...res.data.getProfile,
      isFollowed: res.data.isFollowed || false,
    };
  });
};
