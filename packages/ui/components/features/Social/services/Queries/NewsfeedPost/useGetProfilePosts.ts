import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import { useQuery } from "react-query";
import {
  Attachment,
  AttachmentType,
  GetNewsfeedPostsByUserIdInput,
  Hashtag,
  NewsfeedPost,
  PostLocation,
  PostMention,
  PostTag,
  Profile,
} from "@features/API";
import { getRandomImage } from "@UI/placeholder";

export type GetProfilePostsQueryVariables = Exact<{
  args: GetNewsfeedPostsByUserIdInput;
}>;

export type GetProfilePostsQuery = { __typename?: "Query" } & {
  getNewsfeedPostsByUserId: Array<
    { __typename?: "NewsfeedPost" } & Pick<
      NewsfeedPost,
      | "id"
      | "content"
      | "shares"
      | "reactionNum"
      | "comments"
      | "title"
      | "userId"
    > & {
        attachments: Array<
          { __typename?: "Attachment" } & Pick<Attachment, "src" | "type">
        >;
        hashtags: Array<{ __typename?: "Hashtag" } & Pick<Hashtag, "tag">>;
        location?: Maybe<
          { __typename?: "PostLocation" } & Pick<
            PostLocation,
            "address" | "city" | "country" | "state"
          >
        >;
        mentions: Array<
          { __typename?: "PostMention" } & Pick<PostMention, "userId">
        >;
        publisher?: Maybe<
          { __typename?: "Profile" } & Pick<
            Profile,
            "id" | "username" | "photo"
          >
        >;
        tags: Array<{ __typename?: "PostTag" } & Pick<PostTag, "userId">>;
      }
  >;
};

export const useGetProfilePosts = (args: GetNewsfeedPostsByUserIdInput) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getProfilePosts(
            $args:GetNewsfeedPostsByUserIdInput!
        ) {
            getNewsfeedPostsByUserId(
                args:$args
            ){
                id
                content
                attachments{
                    src
                    type
                }
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
                    username
                    photo
                }
                shares
                reactionNum
                comments
                tags{
                    userId
                }
                title
                userId
            }
        }
    `);

  client.setVariables<GetProfilePostsQueryVariables>({
    args,
  });

  return useQuery(["get-profile-posts", { args }], async () => {
    return [...Array(30)].map(() => ({
      id: "",
      attachments: [{ src: getRandomImage(), type: AttachmentType.Img }],
      authorProfileId: "",
      comments: 45,
      content: "Test",
      createdAt: new Date().toString(),
      listTitle: "Most liked post",
      reactionNum: 26,
      publisher: {
        id: "",
        ownerId: "",
        photo: getRandomImage(),
        profession: "profe",
        username: "name",
      },
      shares: 54,
      tags: [],
      title: "title",
      userId: "",
      hashtags: [],
      mentions: [],
      location: {
        city: "",
        country: "",
        address: "",
        state: "",
      },
    })) as GetProfilePostsQuery["getNewsfeedPostsByUserId"];

    const res = await client.send<GetProfilePostsQuery>();
    return res.data.getNewsfeedPostsByUserId;
  });
};
