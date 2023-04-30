import { createGraphqlRequestClient } from "@UI/../api";
import { getRandomName, isDev } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import { Exact, Profile } from "@features/API";
import { useQuery } from "react-query";

export type GetUserDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserDataQuery = { __typename?: "Query" } & {
  myProfile: { __typename?: "Profile" } & Pick<
    Profile,
    "username" | "photo" | "ownerId"
  >;
};

export const getUserDataQueryKey = () => ["user-data"];

export const getUserDataQueryFetcher = async () => {
  if (isDev) {
    const mockRes: GetUserDataQuery["myProfile"] = {
      ownerId: "ownerid",
      photo: getRandomImage(),
      username: `${getRandomName().firstName} ${getRandomName().lastName}`,
    };

    return mockRes;
  }

  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `query getUserData{
  myProfile{
    username
    photo
    ownerId
  }
}
`
    )
    .setVariables<GetUserDataQueryVariables>({})
    .send<GetUserDataQuery>();

  return res.data.myProfile;
};

export const useUserProfile = () => ({
  ...useQuery(getUserDataQueryKey(), () => getUserDataQueryFetcher()),
});
