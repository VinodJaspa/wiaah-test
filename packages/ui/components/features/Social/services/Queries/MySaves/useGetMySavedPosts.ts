import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import { useQuery } from "react-query";
import {
  AttachmentType,
  GetMySavedPostsInput,
  NewsfeedPost,
  Profile,
  UserSavedPostsGroup,
} from "@features/API";
import { randomNum } from "@UI/../utils/src";

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
    const mockRes: GetMySavedPostsQuery["getMySavedPosts"] = {
      id: "test",
      userId: "",
      posts: [
        {
          id: "test",
          comments: randomNum(5),
          hashtags: [],
          createdAt: new Date().toString(),
          attachments: [
            "https://images.pexels.com/photos/15193687/pexels-photo-15193687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          ],
          content: "test post",
          reactionNum: randomNum(300),
          shares: randomNum(100),
          tags: [],
          title: "test title",
          userId: "",
          publisher: {
            id: "test",
            ownerId: "test",
            photo: "/profile (4).jfif",
            profession: "Artist",
            username: "publisher name",
          },
        },
      ],
    };

    return mockRes;
    const res = await client.send<GetMySavedPostsQuery>();

    return res.data.getMySavedPosts;
  });
};
