import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import {
  GetContentCommentsInput,
  Comment,
  Attachment,
  Profile,
  ContentHostType,
  AttachmentType,
  CommentsCursorPaginationResponse,
} from "@features/API";
import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useQuery,
} from "react-query";
import { getRandomName, isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";

export type GetContentCommentsQueryVariables = Exact<{
  args: GetContentCommentsInput;
}>;

export type GetContentCommentsQuery = { __typename?: "Query" } & {
  getContentComments: {
    data: Array<
      { __typename?: "Comment" } & Pick<
        Comment,
        | "id"
        | "content"
        | "commentedAt"
        | "likes"
        | "userId"
        | "hostId"
        | "hostType"
        | "updatedAt"
        | "replies"
      > & {
          attachment: { __typename?: "Attachment" } & Pick<
            Attachment,
            "src" | "type"
          >;
          author?: Maybe<
            { __typename?: "Profile" } & Pick<
              Profile,
              "username" | "photo" | "verified" | "id"
            >
          >;
        }
    >;
  };
};

export const useGetContentCommentsQuery = (
  args: GetContentCommentsInput,
  options?: UseInfiniteQueryOptions<
    GetContentCommentsQuery["getContentComments"],
    unknown,
    GetContentCommentsQuery["getContentComments"],
    unknown,
    any
  >,
) => {
  return useQuery(
    ["get-content-comments", { args }],
    async ({ meta, queryKey, pageParam }) => {
      if (isDev) {
        const res: GetContentCommentsQuery["getContentComments"] = {
          data: [...Array(10)].map((_, i) => ({
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
              id: "test",
              photo: getRandomImage(),
              username: getRandomName().firstName,
              verified: i % 2 === 0,
            },
            hostUserId: "test",
            attachment: {
              src: "",
              type: AttachmentType.Img,
              marketingTags: [],
            },
            authorProfileId: "",
            replies: 10,
            updatedAt: new Date().toUTCString(),
          })),
        };

        return res;
      }

      const client = createGraphqlRequestClient();

      client.setQuery(`
query getContentComments(
        $args:GetContentCommentsInput!
    ){
        getContentComments(
            getContentCommentsArgs:$args
        ){
        cursor
        hasMore
        nextCursor
        data{
            id
            attachment{
                src
                type
            }
            author{
              id
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
            hostUserId
        }
        }
    }
  `);

      client.setVariables<GetContentCommentsQueryVariables>({
        args: {
          id: args.id,
          cursor: pageParam || args.cursor,
          take: args.take,
        },
      });

      const res = await client.send<GetContentCommentsQuery>();

      return res.data.getContentComments;
    },
  );
};
