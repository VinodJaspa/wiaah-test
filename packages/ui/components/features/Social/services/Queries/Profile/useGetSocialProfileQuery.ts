import { createGraphqlRequestClient } from "api";
import { Exact, Maybe, Scalars } from "types";
import {
  AccountType,
  ActiveStatus,
  Profile,
  ProfileVisibility,
  Query,
} from "@features/API";
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
    return {
      id: "",
      activeStatus: ActiveStatus.Active,
      bio: "My Social Profile Bio",
      createdAt: new Date().toString(),
      followers: 150,
      following: 150,
      lastActive: new Date().toString(),
      ownerId: "",
      photo:
        "https://s3-alpha-sig.figma.com/img/4486/0e13/e30508fe607fb1ae2e273340d5ebf491?Expires=1682899200&Signature=HQqs4dzddB0ihEtmb7nFVEWbNNxB8iVTLF7tPQYEbkch1L-CQoywd4EhnL~ZlY6~fsCFi~3ql4dxq7I2vRhREjU3o5kkZa8BvgFSMRVqEZNio30RQujd6XaQqaWa2r8Da-C8nxdDe0AUcEnavYVbQjggkJnWDmd-CA3FairlTltwdmI2-QJ5zP5Qtz2WwG22sWjRadQ3oIbijcWF-OWUOYDd-iCQzq1bQBQlvmtFNZQE8S5SAIHICE75ppSe5Y~tWKIJuLNns97lqsR14HihBLF96CNYHwdLbS4VB606ejlsODOto4Li9D3-UeqAQ9HQSprYgGMKELmkqmVObERKyA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      profession: "prof",
      publications: 150,
      updatedAt: new Date().toString(),
      username: "Nike",
      verified: true,
      visibility: ProfileVisibility.Public,
      isFollowed: true,
      user: {
        id: "",
        type: AccountType.Seller,
        verified: true,
      },
    } as GetProfileByIdQuery["getProfile"];

    const res = await client.send<GetProfileByIdQuery>();

    return {
      ...res.data.getProfile,
      isFollowed: res.data.isFollowed || false,
    };
  });
};
