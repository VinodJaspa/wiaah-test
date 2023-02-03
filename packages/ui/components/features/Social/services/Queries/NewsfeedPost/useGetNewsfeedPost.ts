import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import {
  Attachment,
  Hashtag,
  NewsfeedPost,
  PostLocation,
  PostMention,
  PostTag,
  Profile,
} from "@features/API";
import { Exact, Maybe, Scalars } from "types";

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
          "id" | "verified" | "username" | "photo" | "profession" | "createdAt"
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
    const res = await client.send<GetNewsfeedPostQuery>();

    return res.data.getNewsfeedPostById;
  });
};
