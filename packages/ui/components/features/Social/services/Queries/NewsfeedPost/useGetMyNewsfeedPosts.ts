import { isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import { Exact, GetMyNewsfeedPostsInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetMyNewsfeedQueryVariables = Exact<{
  args: GetMyNewsfeedPostsInput;
}>;

export type GetMyNewsfeedQuery = {
  __typename?: "Query";
  getMyNewsfeedPosts: Array<{
    __typename?: "NewsfeedPost";
    id: string;
    title: string;
    userId: string;
    comments: number;
    reactionNum: number;
    content: string;
    createdAt: string;
    shares: number;
    attachments: Array<string>;
    publisher?: {
      __typename?: "Profile";
      ownerId: string;
      username: string;
      photo: string;
      verified: boolean;
      profession: string;
    } | null;
    hashtags: Array<{ __typename?: "Hashtag"; id: string; tag: string }>;
    tags: Array<{ __typename?: "PostTag"; userId: string }>;
  }>;
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
        getRandomImage(),
        getRandomImage(),
        getRandomImage(),
        getRandomImage(),
      ],
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
    
    title
    userId
    comments
    reactionNum
    content
    
    createdAt
    shares
    attachments
    publisher{
        ownerId
        username
        photo
        verified
        profession
      }
     hashtags {
         id
         tag
       }
       tags {
         userId
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
