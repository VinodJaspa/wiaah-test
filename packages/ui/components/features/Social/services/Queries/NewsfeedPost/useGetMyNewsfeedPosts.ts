import {
  Attachment,
  Exact,
  GetMyNewsfeedPostsInput,
  Hashtag,
  Maybe,
  NewsfeedPost,
  PostTag,
  Profile,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetMyNewsfeedQueryVariables = Exact<{
  args: GetMyNewsfeedPostsInput;
}>;

export type GetMyNewsfeedQuery = { __typename?: "Query" } & {
  getMyNewsfeedPosts: Array<
    { __typename?: "NewsfeedPost" } & Pick<
      NewsfeedPost,
      | "id"
      | "title"
      | "userId"
      | "comments"
      | "reactionNum"
      | "authorProfileId"
      | "content"
      | "createdAt"
      | "shares"
    > & {
        publisher?: Maybe<
          { __typename?: "Profile" } & Pick<
            Profile,
            "id" | "ownerId" | "username" | "photo" | "profession"
          >
        >;
        hashtags: Array<
          { __typename?: "Hashtag" } & Pick<Hashtag, "id" | "tag">
        >;
        tags: Array<{ __typename?: "PostTag" } & Pick<PostTag, "userId">>;
        attachments: Array<
          { __typename?: "Attachment" } & Pick<Attachment, "src" | "type">
        >;
      }
  >;
};

type args = GetMyNewsfeedQueryVariables["args"];

export const getMyNewsfeedPostsQueryKey = (args: args) => [
  "get-my-newsfeed-posts",
  { args },
];

export const getMyNewsfeedPostsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getMyNewsfeed(
  $args:GetMyNewsfeedPostsInput!
){
  getMyNewsfeedPosts(
    args:$args
  ){
    id
    publisher{
      ownerId
      username
      photo
      profession
    }
    title
    userId
    comments
    reactionNum
    authorProfileId
    content
    hashtags {
      id
      tag
    }
    createdAt
    tags {
      userId
    }
    shares
    attachments {
      src
      type
    }
  }
}
  `);

  const res = await client
    .setVariables<GetMyNewsfeedQueryVariables>({ args })
    .send<GetMyNewsfeedQuery>();

  return res.data.getMyNewsfeedPosts;
};

export const useGetMyNewsfeedPostsQuery = (args: args) =>
  useQuery(getMyNewsfeedPostsQueryKey(args), () =>
    getMyNewsfeedPostsQueryFetcher(args)
  );
