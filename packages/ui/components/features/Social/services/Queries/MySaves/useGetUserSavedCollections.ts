import { createGraphqlRequestClient } from "api";
import { Exact, NewsfeedPost, SavesCollection, Scalars } from "@features/API";
import { UseQueryOptions, useQuery } from "react-query";

export type GetUserSavesCollectionsQueryVariables = Exact<{
  userId: Scalars["String"];
}>;

export type GetUserSavesCollectionsQuery = { __typename?: "Query" } & {
  getUserSaveCollections: Array<
    { __typename?: "SavesCollection" } & Pick<
      SavesCollection,
      "id" | "name"
    > & {
        recentSaves: Array<
          { __typename?: "UserSavedPost" } & {
            post: { __typename?: "NewsfeedPost" } & Pick<
              NewsfeedPost,
              "thumbnail"
            >;
          }
        >;
      }
  >;
};

type args = GetUserSavesCollectionsQueryVariables;

export const getUserSaveCollectionsQueryKey = (args: args) => [
  "user-saves-collections",
  { args },
];

export const getUserSaveCollectionsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getUserSavesCollections($userId:String!){
  getUserSaveCollections(userId:$userId){
    id
    name
    recentSaves{
      post{
        thumbnail
      }
    }
  }
}
    `
    )
    .setVariables<GetUserSavesCollectionsQueryVariables>(args)
    .send<GetUserSavesCollectionsQuery>();

  return res.data.getUserSaveCollections;
};

export const useGetUserSavedCollections = (
  args: args,
  options?: UseQueryOptions<
    GetUserSavesCollectionsQuery["getUserSaveCollections"],
    unknown,
    GetUserSavesCollectionsQuery["getUserSaveCollections"],
    any
  >
) =>
  useQuery(
    getUserSaveCollectionsQueryKey(args),
    () => getUserSaveCollectionsQueryFetcher(args),
    options
  );
