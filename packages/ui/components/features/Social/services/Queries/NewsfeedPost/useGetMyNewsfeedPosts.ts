import { isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import {
  AccountType,
  Exact,
  GetMyNewsfeedPostsInput,
  PostCardInfo,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetMyNewsfeedQueryVariables = Exact<{
  args: GetMyNewsfeedPostsInput;
}>;

export type GetMyNewsfeedQuery = {
  __typename?: "Query";
  getMyNewsfeedPosts: Array<PostCardInfo>;
};

type args = GetMyNewsfeedQueryVariables["args"];

export const getMyNewsfeedPostsQueryKey = (args: args) => [
  "get-my-newsfeed-posts",
  { args },
];

export const getMyNewsfeedPostsQueryFetcher = async (args: args) => {
  if (isDev) {
    const mockRes: GetMyNewsfeedQuery["getMyNewsfeedPosts"] = [
      {
        profileInfo: {
          id: "user-123",
          verifed: true,
          name: "John Doe",
          thumbnail: "https://example.com/profile_pics/john_doe_thumb.jpg",
          accountType: AccountType.Seller,
          public: true,
          profession: "Software Engineer",
        },
        postInfo: {
          createdAt: "2024-06-08T08:00:00Z",
          id: "post-456",
          content: "Just launched my new app! Check it out!",
          tags: ["app", "launch", "mobile"],
          views: 123,
          attachments: [
            {
              type: "image",
              src: "https://example.com/posts/app_screenshot.png",
            },
          ],
          numberOfLikes: 10,
          numberOfComments: 2,
          numberOfShares: 5,
          comments: [
            {
              id: "comment-789",
              user: {
                id: "user-987",
                name: "Jane Smith",
                thumbnail:
                  "https://example.com/profile_pics/jane_smith_thumb.jpg",
                accountType: AccountType.Buyer,
                public: true,
              },
              replies: 0,
              likes: 1,
              createdAt: "2024-06-08T08:10:00Z",
              content: "Looks great, John! Congrats!",
            },
            {
              id: "comment-012",
              user: {
                id: "user-345",
                name: "Alice Johnson",
                thumbnail:
                  "https://example.com/profile_pics/alice_johnson_thumb.jpg",
                accountType: AccountType.Buyer,
                public: false,
              },
              replies: 0,
              likes: 0,
              createdAt: "2024-06-08T08:15:00Z",
              content: "Definitely checking it out!",
            },
          ],
          thumbnail: "https://example.com/posts/app_icon.png",
        },
      },
    ];
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
