import { createGraphqlRequestClient } from "api";
import { Exact } from "types";
import { Attachment, NewsfeedPost } from "@features/API";
import { useQuery } from "react-query";

export type GetTopHashtagNewsfeedPostsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetTopHashtagNewsfeedPostsQuery = { __typename?: "Query" } & {
  getTopHashtagNewsfeed: { __typename?: "TopHashtagNewsfeedPosts" } & {
    commented: { __typename?: "NewsfeedPost" } & Pick<
      NewsfeedPost,
      "id" | "content" | "thumbnail"
    > & {
        attachments: Array<
          { __typename?: "Attachment" } & Pick<Attachment, "src" | "type">
        >;
      };
    liked: { __typename?: "NewsfeedPost" } & Pick<
      NewsfeedPost,
      "id" | "content" | "thumbnail"
    > & {
        attachments: Array<
          { __typename?: "Attachment" } & Pick<Attachment, "src" | "type">
        >;
      };
    shared: { __typename?: "NewsfeedPost" } & Pick<
      NewsfeedPost,
      "id" | "content" | "thumbnail"
    > & {
        attachments: Array<
          { __typename?: "Attachment" } & Pick<Attachment, "src" | "type">
        >;
      };
    viewed: { __typename?: "NewsfeedPost" } & Pick<
      NewsfeedPost,
      "id" | "content" | "thumbnail"
    > & {
        attachments: Array<
          { __typename?: "Attachment" } & Pick<Attachment, "src" | "type">
        >;
      };
  };
};

export const useGetTopHashtagPostsQuery = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
      query getTopHashtagNewsfeedPosts{
    getTopHashtagNewsfeed {
        commented {
            id
            attachments{
                src
                type
            }
            content
            thumbnail
        }
        liked{
            id
            attachments{
                src
                type
            }
            content
            thumbnail
        }
        shared{
            id
            attachments{
                src
                type
            }
            content
            thumbnail
        }
        viewed{
            id
            attachments{
                src
                type
            }
            content
            thumbnail
        }
    }
}  
    `);

  return useQuery(["get-top-hashtag-posts"], async () => {
    const res = await client.send<GetTopHashtagNewsfeedPostsQuery>();

    return res.data.getTopHashtagNewsfeed;
  });
};
