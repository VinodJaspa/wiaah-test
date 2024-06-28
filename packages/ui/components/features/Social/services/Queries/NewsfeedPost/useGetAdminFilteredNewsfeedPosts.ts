import {
  Attachment,
  AttachmentType,
  Exact,
  GetAdminFilteredNewsfeedPostsInput,
  Hashtag,
  Maybe,
  NewsfeedPost,
  Profile,
} from "@features/API";
import { isDev, randomNum } from "utils";
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

  if (isDev) {
    const res: GetAdminFilteredPostsQuery["getFilteredNewsfeedPosts"] = [
      ...Array(5),
    ].map((_, i) => ({
      id: i.toString(),
      authorProfileId: i.toString(),
      comments: randomNum(500),
      content: `post number ${i}`,
      createdAt: new Date().toString(),
      hashtags: [],
      attachments: [
        {
          src: "/profile (6).jfif",
          type: AttachmentType.Img,
        },
      ],
      reactionNum: randomNum(1000),
      shares: randomNum(150),
      title: `post title ${i}`,
      userId: i.toString(),
      views: randomNum(10000),
    }));

    return res;
  }
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
    getAdminFilteredNewsfeedPostsFetcher(args),
  );
};
