import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import {
  GetContentCommentsInput,
  Comment,
  Attachment,
  Profile,
} from "@features/Social/services/types";
import { useQuery } from "react-query";

export type GetContentCommentsQueryVariables = Exact<{
  args: GetContentCommentsInput;
}>;

export type GetContentCommentsQuery = { __typename?: "Query" } & {
  getContentComments: Array<
    { __typename?: "Comment" } & Pick<
      Comment,
      | "id"
      | "content"
      | "commentedAt"
      | "likes"
      | "userId"
      | "hostId"
      | "hostType"
    > & {
        attachments: Array<
          { __typename?: "Attachment" } & Pick<Attachment, "src" | "type">
        >;
        author?: Maybe<
          { __typename?: "Profile" } & Pick<
            Profile,
            "username" | "photo" | "verified"
          >
        >;
      }
  >;
};

export const useGetContentCommentsQuery = (args: GetContentCommentsInput) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getContentComments(
        $args:GetContentCommentsInput!
    ){
        getContentComments(
            getContentCommentsArgs:$args
        ){
            id
            attachment{
                src
                type
            }
            author{
                username
                photo
                verified
            }
            content
            commentedAt
            likes
            userId
            hostId
            hostType
            updatedAt
        }
    }
  `);

  client.setVariables<GetContentCommentsQueryVariables>({
    args,
  });

  return useQuery(["get-content-comments", { args }], async () => {
    const res = await client.send<GetContentCommentsQuery>();

    return res.data.getContentComments;
  });
};
