import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import {
  Attachment,
  AttachmentType,
  Hashtag,
  NewsfeedPost,
  PostLocation,
  PostMention,
  PostTag,
  Profile,
} from "@features/API";
import { Exact, Maybe, Scalars } from "types";
import { getRandomName, isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";

export type GetNewsfeedPostQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetNewsfeedPostQuery = { __typename?: "Query" } & {
  getNewsfeedPostById: { __typename?: "NewsfeedPost" } & Pick<
    NewsfeedPost,
    | "id"
    | "comments"
    | "authorProfileId"
    | "content"
    | "createdAt"
    | "reactionNum"
    | "shares"
    | "title"
    | "updatedAt"
    | "userId"
    | "views"
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
          | "id"
          | "verified"
          | "username"
          | "photo"
          | "profession"
          | "createdAt"
          | "ownerId"
        >
      >;
      tags: Array<{ __typename?: "PostTag" } & Pick<PostTag, "userId">>;
    };
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
        id: "",
        attachments: [{ src: getRandomImage(), type: AttachmentType.Img }],
        authorProfileId: "",
        comments: 45,
        content: "Test",
        createdAt: new Date().toString(),
        reactionNum: 26,
        updatedAt: new Date().toUTCString(),
        views: randomNum(1500),
        publisher: {
          id: "",
          ownerId: "",
          photo: getRandomImage(),
          profession: "profe",
          username: getRandomName().firstName,
          createdAt: new Date().toUTCString(),
          verified: true,
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
      };

      return mockRes;
    }

    const res = await client.send<GetNewsfeedPostQuery>();

    return res.data.getNewsfeedPostById;
  });
};
