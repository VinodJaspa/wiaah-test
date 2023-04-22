import { isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import {
  Attachment,
  AttachmentType,
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
            "id" | "ownerId" | "username" | "photo" | "profession" | "verified"
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
  if (isDev) {
    const mockRes: GetMyNewsfeedQuery["getMyNewsfeedPosts"] = [
      ...Array(15),
    ].map((v, i) => ({
      id: i.toString(),
      attachments: [
        {
          src: getRandomImage(),
          type: AttachmentType.Img,
        },
        {
          src: getRandomImage(),
          type: AttachmentType.Img,
        },
        {
          src: getRandomImage(),
          type: AttachmentType.Img,
        },
        {
          src: getRandomImage(),
          type: AttachmentType.Img,
        },
      ],
      authorProfileId: "",
      comments: randomNum(15654321),
      content:
        "Lorem Ipsum is simply dummy text of the printing  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      createdAt: new Date().toString(),
      hashtags: [],
      reactionNum: randomNum(5646532),
      shares: randomNum(657465),
      tags: [],
      title: "test",
      userId: "",
      publisher: {
        id: "",
        ownerId: "",
        photo: getRandomImage(),
        profession: "test",
        username: "Nike",
        verified: true,
      },
    }));
    return mockRes;
  }

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
      verified
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
