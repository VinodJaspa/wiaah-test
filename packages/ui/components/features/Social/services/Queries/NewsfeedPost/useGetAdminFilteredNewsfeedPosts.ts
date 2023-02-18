import {
  Attachment,
  Exact,
  GetAdminFilteredNewsfeedPostsInput,
  Hashtag,
  Maybe,
  NewsfeedPost,
  Profile,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetAdminFilteredPostsQueryVariables = Exact<{
  args: GetAdminFilteredNewsfeedPostsInput;
}>;

export type GetAdminFilteredPostsQuery = { __typename?: "Query" } & {
  getFilteredNewsfeedPosts: Array<
    { __typename?: "NewsfeedPost" } & Pick<
      NewsfeedPost,
      | "content"
      | "comments"
      | "reactionNum"
      | "shares"
      | "views"
      | "userId"
      | "title"
      | "authorProfileId"
      | "id"
      | "createdAt"
    > & {
        hashtags: Array<{ __typename?: "Hashtag" } & Pick<Hashtag, "tag">>;
        attachments: Array<
          { __typename?: "Attachment" } & Pick<Attachment, "src" | "type">
        >;
        publisher?: Maybe<
          { __typename?: "Profile" } & Pick<Profile, "photo" | "username">
        >;
      }
  >;
};

type args = GetAdminFilteredPostsQueryVariables["args"];
export const getAdminFilteredNewsfeedPostsQueryKey = (args: args) => [
  "get-admin-filtered-newsfeed-posts",
  { args },
];

export const getAdminFilteredNewsfeedPostsFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getAdminFilteredPosts($args:GetAdminFilteredNewsfeedPostsInput!) {
 	getFilteredNewsfeedPosts(
    args:$args
  ){
    content
    hashtags{
      tag
    }
    attachments{
      src
      type
    }
    id
    comments
    reactionNum
    shares
    views
    userId
    title
    createdAt
    authorProfileId
    publisher {
      photo
      username
      
    }
  }
}
  `);

  const res = await client
    .setVariables<GetAdminFilteredPostsQueryVariables>({ args })
    .send<GetAdminFilteredPostsQuery>();

  return res.data.getFilteredNewsfeedPosts;
};

export const useGetAdminFilteredNewsfeedPosts = (args: args) => {
  return useQuery(getAdminFilteredNewsfeedPostsQueryKey(args), () =>
    getAdminFilteredNewsfeedPostsFetcher(args)
  );
};
