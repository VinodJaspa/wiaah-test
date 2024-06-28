import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import {
  Action,
  Attachment,
  Community,
  GetCommunityPostsInput,
  Hashtag,
  NewsfeedPost,
  PostLocation,
  PostMention,
  PostTag,
  Profile,
} from "@features/API";
import { useQuery } from "react-query";

export type GetDiscoverPostsQueryVariables = Exact<{
  args: GetCommunityPostsInput;
}>;

export type GetDiscoverPostsQuery = { __typename?: "Query" } & {
  getCommunityPosts: Array<
    { __typename?: "Community" } & Pick<Community, "id" | "type"> & {
        newsfeed?: Maybe<
          { __typename?: "NewsfeedPost" } & Pick<
            NewsfeedPost,
            | "id"
            | "content"
            | "createdAt"
            | "comments"
            | "shares"
            | "reactionNum"
            | "views"
            | "title"
            | "userId"
            | "updatedAt"
          > & {
              hashtags: Array<
                { __typename?: "Hashtag" } & Pick<Hashtag, "tag">
              >;
              attachments: Array<
                { __typename?: "Attachment" } & Pick<Attachment, "src" | "type">
              >;
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
                  "id" | "profession" | "username" | "photo" | "ownerId"
                >
              >;
              tags: Array<{ __typename?: "PostTag" } & Pick<PostTag, "userId">>;
            }
        >;
        action?: Maybe<
          { __typename?: "Action" } & Pick<
            Action,
            | "id"
            | "comments"
            | "reactionNum"
            | "shares"
            | "userId"
            | "visibility"
          > & {
              attachment: { __typename?: "Attachment" } & Pick<
                Attachment,
                "src" | "type"
              >;
              location: { __typename?: "PostLocation" } & Pick<
                PostLocation,
                "address" | "city" | "country" | "state"
              >;
            }
        >;
      }
  >;
};

export const useGetDiscoverPosts = (args: GetCommunityPostsInput) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getDiscoverPosts(
            $args:GetCommunityPostsInput!
        ){
            getCommunityPosts(
                args:$args
            ){
                id
                type
                newsfeed{
                    id
                    authorProfileId
                    content
                    createdAt
                    hashtags{
                        tag
                    }
                    attachments{
                        src
                        type
                    }
                    comments
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
                        profession
                        username
                        photo
                        ownerId
                    }
                    shares
                    reactionNum
                    views
                    title
                    tags {
                        userId
                    }
                }
                action{
                    id
                    attachment{
                        src
                        type
                    }
                    comments
                    location{
                        address
                        city
                        country
                        state
                    }
                    reactionNum
                    shares
                    userId
                    visibility
                }
            }
        }
    `);

  client.setVariables<GetDiscoverPostsQueryVariables>({
    args,
  });

  return useQuery(["get-discover-posts", { args }], async () => {
    const res = await client.send<GetDiscoverPostsQuery>();

    return res.data.getCommunityPosts;
  });
};
