import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import { useQuery } from "react-query";
import {
  GetMySavedPostsInput,
  NewsfeedPost,
  Profile,
  UserSavedPostsGroup,
} from "@features/Social/services/types";

export type GetMySavedPostsQueryVariables = Exact<{
  args: GetMySavedPostsInput;
}>;

export type GetMySavedPostsQuery = { __typename?: "Query" } & {
  getMySavedPosts: { __typename?: "UserSavedPostsGroup" } & Pick<
    UserSavedPostsGroup,
    "id" | "userId"
  > & {
      posts: Array<
        { __typename?: "NewsfeedPost" } & Pick<
          NewsfeedPost,
          | "id"
          | "title"
          | "content"
          | "comments"
          | "reactionNum"
          | "userId"
          | "authorProfileId"
          | "hashtags"
          | "createdAt"
          | "tags"
          | "shares"
          | "attachments"
        > & {
            publisher?: Maybe<
              { __typename?: "Profile" } & Pick<
                Profile,
                "id" | "photo" | "username" | "ownerId" | "profession"
              >
            >;
          }
      >;
    };
};

export const useGetMySavedPostsQuery = (input: GetMySavedPostsInput) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getMySavedPosts(
        $args:GetMySavedPostsInput!
    ){
        getMySavedPosts(
        args:$args
        ){
            id
            posts {
                id
                title
                userId
                comments
                reactionNum
                authorProfileId
                content
                hashtags
                createdAt
                tags
                shares
                attachments
                publisher{
                    id
                    photo
                    username
                }
            }
            userId
        }
    }
    `);

  client.setVariables<GetMySavedPostsQueryVariables>({
    args: input,
  });

  return useQuery(["my-saved-posts"], async () => {
    const res = await client.send<GetMySavedPostsQuery>();

    return res.data.getMySavedPosts;
  });
};
