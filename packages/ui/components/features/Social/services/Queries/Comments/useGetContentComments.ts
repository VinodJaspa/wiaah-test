import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import {
  GetContentCommentsInput,
  Comment,
  Attachment,
  Profile,
  ContentHostType,
} from "@features/API";
import { useQuery } from "react-query";
import { getRandomName, isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";

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
      | "createdAt"
      | "replies"
      | "authorProfileId"
      | "updatedAt"
      | "attachment"
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
    if (isDev) {
      const res: GetContentCommentsQuery["getContentComments"] = [
        ...Array(10),
      ].map((_, i) => ({
        id: "",
        attachments: [],
        commentedAt: new Date().toString(),
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
        hostId: "",
        hostType: ContentHostType.PostNewsfeed,
        likes: randomNum(150),
        userId: "",
        createdAt: new Date().toUTCString(),
        author: {
          photo: getRandomImage(),
          username: getRandomName().firstName,
          verified: i % 2 === 0,
        },
      }));

      return res;
    }

    const res = await client.send<GetContentCommentsQuery>();

    return res.data.getContentComments;
  });
};
