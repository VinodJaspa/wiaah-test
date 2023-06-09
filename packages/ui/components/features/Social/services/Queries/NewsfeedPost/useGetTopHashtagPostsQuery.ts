import { createGraphqlRequestClient } from "api";
import { Exact } from "types";
import { Scalars } from "@features/API";
import { useQuery } from "react-query";

export type GetTopHashtagNewsfeedPostsQueryVariables = Exact<{
  tag: Scalars["String"]["input"];
}>;

export type GetTopHashtagNewsfeedPostsQuery = {
  __typename?: "Query";
  getTopHashtagNewsfeed: {
    __typename?: "TopHashtagNewsfeedPosts";
    commented: {
      __typename?: "NewsfeedPost";
      id: string;
      attachments: Array<string>;
      content: string;
      thumbnail: string;
    };
    liked: {
      __typename?: "NewsfeedPost";
      id: string;
      attachments: Array<string>;
      content: string;
      thumbnail: string;
    };
    shared: {
      __typename?: "NewsfeedPost";
      id: string;
      attachments: Array<string>;
      content: string;
      thumbnail: string;
    };
    viewed: {
      __typename?: "NewsfeedPost";
      id: string;
      attachments: Array<string>;
      content: string;
      thumbnail: string;
    };
  };
};

export const useGetTopHashtagPostsQuery = (tag: string) => {
  const client = createGraphqlRequestClient();

  client
    .setQuery(
      `
query getTopHashtagNewsfeedPosts($tag: String!) {
  getTopHashtagNewsfeed(tag: $tag) {
    commented {
      id
      attachments
      content
      thumbnail
    }
    liked {
      id
      attachments 
      content
      thumbnail
    }
    shared {
      id
      attachments
      content
      thumbnail
    }
    viewed {
      id
      attachments
      content
      thumbnail
    }
  }
}

 
    `
    )
    .setVariables<GetTopHashtagNewsfeedPostsQueryVariables>({ tag });

  return useQuery(["get-top-hashtag-posts"], async () => {
    const res = await client.send<GetTopHashtagNewsfeedPostsQuery>();

    return res.data.getTopHashtagNewsfeed;
  });
};
