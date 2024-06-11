import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import {
  AccountType,
  Attachment,
  AttachmentType,
  Hashtag,
  NewsfeedPost,
  PostCardInfo,
  PostLocation,
  PostMention,
  PostTag,
  Profile,
  StaffAccountType,
} from "@features/API";
import { Exact, Maybe, Scalars } from "types";
import { getRandomName, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";

const isDev = true;

export type GetNewsfeedPostQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetNewsfeedPostQuery = { __typename?: "Query" } & {
  getNewsfeedPostById: PostCardInfo;
};

export const useGetNewsfeedPostQuery = (id: string) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getNewsfeedPost(
            $id:String!
        ){
            getNewsfeedPostById(
                id:$id
            ){
                id
                comments
                authorProfileId
                attachments{
                    src
                    type
                }
                content
                createdAt
                hashtags{
                    tag
                }
                location{
                    address
                    city
                    country
                    state
                }
                mentions{
                    userId   
                }
                publisher{
                    id
                    verified
                    username
                    photo
                    profession
                    createdAt

                }
                reactionNum
                shares
                tags{
                    userId
                }
                title
                updatedAt
                userId
                views
            }
        }
    `);

  client.setVariables<GetNewsfeedPostQueryVariables>({ id });

  return useQuery(["get-post", { id }], async () => {
    if (isDev) {
      const mockRes: GetNewsfeedPostQuery["getNewsfeedPostById"] = {
        profileInfo: {
          id: "user123",
          name: "John Doe",
          thumbnail: "https://example.com/profile_pic_thumb.jpg",
          accountType: AccountType.Seller,
          public: true,
          profession: "Software Engineer",
        },
        postInfo: {
          createdAt: "2024-06-07T12:34:56Z",
          id: "post456",
          content: "This is a sample post with some content!",
          tags: ["#fakedata", "#socialmedia"],
          views: 100,
          attachments: [
            {
              type: "image",
              src: "https://example.com/post_image.jpg",
            },
          ],
          numberOfLikes: 25,
          numberOfComments: 3,
          numberOfShares: 5,
          comments: [
            {
              id: "comment1",
              user: {
                id: "user789",
                name: "Jane Smith",
                thumbnail: "https://example.com/jane_thumb.jpg",
                accountType: AccountType.Buyer,
                public: true,
              },
              replies: 0,
              likes: 2,
              createdAt: "2024-06-07T13:00:00Z",
              content: "Nice post!",
            },
            // Add more comments here as needed
          ],
          thumbnail: "https://example.com/post_thumb.jpg",
        },
      };

      return mockRes;
    }

    const res = await client.send<GetNewsfeedPostQuery>();

    return res.data.getNewsfeedPostById;
  });
};
