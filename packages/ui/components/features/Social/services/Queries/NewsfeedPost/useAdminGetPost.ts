import {
  AdminNewsfeedPost,
  Exact,
  Hashtag,
  Maybe,
  NewsfeedPost,
  PostLocation,
  PostMention,
  PostTag,
  Profile,
  Scalars,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetNewsfeedPostQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type AdminGetNewsfeedPostQuery = { __typename?: "Query" } & {
  adminGetNewsfeedPost: { __typename?: "AdminNewsfeedPost" } & Pick<
    AdminNewsfeedPost,
    | "id"
    | "title"
    | "content"
    | "comments"
    | "attachments"
    | "authorProfileId"
    | "commentsVisibility"
    | "createdAt"
    | "enableComments"
    | "reactionNum"
    | "shares"
    | "userId"
    | "views"
    | "updatedAt"
    | "visibility"
  > & {
      hashtags: Array<
        { __typename?: "Hashtag" } & Pick<
          Hashtag,
          "createdAt" | "createdById" | "id" | "tag" | "usage" | "updatedAt"
        >
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
          "photo" | "id" | "username" | "verified"
        >
      >;
      tags: Array<{ __typename?: "PostTag" } & Pick<PostTag, "userId">>;
    };
};

type args = AdminGetNewsfeedPostQueryVariables["id"];
export const useAdminGetPost = (args: args) => {
  return useQuery(["admin-get-post", { args }], async () => {
    const client = createGraphqlRequestClient();
    const res = await client
      .setQuery(
        `
query adminGetNewsfeedPost($id:String!){
    adminGetNewsfeedPost(
        id:$id
    ){
        id
        title
        content
        comments
        attachments
        authorProfileId
        commentsVisibility
        createdAt
        enableComments
        hashtags{
            createdAt
            createdById
            id
            tag
            usage
            updatedAt
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
            photo
            id
            username
            verified
        }
        reactionNum
        shares
        tags{
            userId
        }
        userId
        views
        updatedAt

    }
}
    `
      )
      .setVariables<AdminGetNewsfeedPostQueryVariables>({ id: args })
      .send<AdminGetNewsfeedPostQuery>();

    return res.data.adminGetNewsfeedPost;
  });
};
