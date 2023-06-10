import {
  AdminGetContentCommentsInput,
  Attachment,
  AttachmentType,
  Comment,
  ContentHostType,
  Exact,
  Maybe,
  Profile,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { isDev, randomNum } from "@UI/../utils/src";
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
      if (isDev) {
        const res: AdminGetCommentsQuery["adminGetContentComments"] = [
          ...Array(10),
        ].map((_, i) => ({
          id: "",
          commentedAt: new Date().toString(),
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
          hostId: "",
          hostType: ContentHostType.PostNewsfeed,
          likes: randomNum(150),
          userId: "",
          author: {
            photo: `/profile (${(i % 9) + 1}).jfif`,
            username: `username ${i}`,
            verified: i % 2 === 0,
          },
          attachment: {
            src: "",
            type: AttachmentType.Img,
          },
          authorProfileId: "",
          createdAt: new Date().toString(),
          replies: randomNum(150),
          updatedAt: new Date().toString(),
        }));

        return res;
      }

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
