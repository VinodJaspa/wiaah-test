import {
  AdminGetContentCommentsInput,
  Attachment,
  Comment,
  Exact,
  Maybe,
  Profile,
} from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";

export type AdminGetCommentsQueryVariables = Exact<{
  args: AdminGetContentCommentsInput;
}>;
export type AdminGetCommentsQuery = { __typename?: "Query" } & {
  adminGetContentComments: Array<
    { __typename?: "Comment" } & Pick<
      Comment,
      | "id"
      | "content"
      | "likes"
      | "replies"
      | "userId"
      | "commentedAt"
      | "hostId"
      | "hostType"
      | "authorProfileId"
      | "createdAt"
      | "updatedAt"
    > & {
        attachment: { __typename?: "Attachment" } & Pick<
          Attachment,
          "src" | "type"
        >;
        author?: Maybe<
          { __typename?: "Profile" } & Pick<
            Profile,
            "photo" | "username" | "verified"
          >
        >;
      }
  >;
};
type args = AdminGetCommentsQueryVariables["args"];
export const useAdminGetContentCommentsQuery = (
  args: args,
  enabled?: boolean
) =>
  useQuery(
    ["admin-get-content-comments", { args }],
    async () => {
      const client = createGraphqlRequestClient();

      client.setQuery(`
query adminGetComments($args:AdminGetContentCommentsInput!){
  adminGetContentComments(args:$args){
    id
    content
    attachment {
      src
      type
    }
    author {
      photo
      username
      verified
    }
    likes
    replies
    userId
    commentedAt
    hostId
    hostType
    authorProfileId
    createdAt
    updatedAt
  }
}
    `);

      const res = await client
        .setVariables<AdminGetCommentsQueryVariables>({
          args,
        })
        .send<AdminGetCommentsQuery>();

      return res.data.adminGetContentComments;
    },
    { enabled }
  );
