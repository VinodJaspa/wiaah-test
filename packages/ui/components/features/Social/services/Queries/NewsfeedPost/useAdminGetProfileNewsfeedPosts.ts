import { Account, Exact, Maybe, Profile, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetProfileQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type AdminGetProfileQuery = { __typename?: "Query" } & {
  getAdminProfile: { __typename?: "Profile" } & Pick<
    Profile,
    | "id"
    | "username"
    | "bio"
    | "visibility"
    | "photo"
    | "verified"
    | "publications"
    | "followers"
    | "following"
    | "profession"
    | "coverPhoto"
  > & {
      user?: Maybe<{ __typename?: "Account" } & Pick<Account, "type" | "id">>;
    };
};

export const AdminGetProfileQueryKey = (
  args: AdminGetProfileQueryVariables["id"]
) => ["get-profile"];

export const AdminGetProfileQueryFetcher = async (
  args: AdminGetProfileQueryVariables["id"]
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetProfile (
  $id:String!
){
  getAdminProfile(id:$id){
    id
    user {
      type
    	id
    }
    username
    bio
    visibility
    photo
    verified
    publications
    followers
    following
    profession
    coverPhoto
  }
}
    `);

  client.setVariables({
    args,
  });

  return (await client.send<AdminGetProfileQuery>()).data.getAdminProfile;
};

export const useAdminGetProfileQuery = (
  args: AdminGetProfileQueryVariables["id"]
) => {
  return useQuery(
    AdminGetProfileQueryKey(args),
    () => AdminGetProfileQueryFetcher(args),
    {
      enabled: !!args,
    }
  );
};
