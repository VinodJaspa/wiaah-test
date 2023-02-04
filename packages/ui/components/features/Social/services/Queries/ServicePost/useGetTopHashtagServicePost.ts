import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import { useQuery } from "react-query";
import { GetHashtagTopServicePostsInput, ServicePost } from "@features/API";
import { Service } from "@features/API";

export type GetTopServiceHashtagPostsQueryVariables = Exact<{
  args: GetHashtagTopServicePostsInput;
}>;

type ServiceArg = Maybe<
  { __typename?: "Service" } & Pick<
    Service,
    "id" | "hashtags" | "price" | "presentation" | "title" | "serviceType"
  >
>;

export type GetTopServiceHashtagPostsQuery = { __typename?: "Query" } & {
  getHashtagTopServicePosts: { __typename?: "ServicePostHashtagSearch" } & {
    commented?: Maybe<
      { __typename?: "ServicePost" } & Pick<ServicePost, "id"> & {
          service?: Service;
        }
    >;
    liked?: Maybe<
      { __typename?: "ServicePost" } & Pick<ServicePost, "id"> & {
          service?: ServiceArg;
        }
    >;
    shared?: Maybe<
      { __typename?: "ServicePost" } & Pick<ServicePost, "id"> & {
          service?: ServiceArg;
        }
    >;
    viewed?: Maybe<
      { __typename?: "ServicePost" } & Pick<ServicePost, "id"> & {
          service?: ServiceArg;
        }
    >;
  };
};

export const useGetTopHashtagServicePost = (
  input: GetHashtagTopServicePostsInput
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getTopServiceHashtagPosts(
    $args:GetHashtagTopServicePostsInput!
){  
    getHashtagTopServicePosts(
        args:$args
    ){
        commented {
            id
            service{
                id
                hashtags
                price
                presentation
                title
                serviceType
            }
        }
        liked {
            id
            service{
                id
                hashtags
                price
                presentation
                title
                serviceType
            }
        }
        shared {
            id
            service{
                id
                hashtags
                price
                presentation
                title
                serviceType
            }
        }
        viewed {
            id
            service{
                id
                hashtags
                price
                presentation
                title
                serviceType
            }
        }
    }
}
    `);

  client.setVariables<GetTopServiceHashtagPostsQueryVariables>({
    args: input,
  });

  return useQuery(["use-get-top-hashtag-service-post"], async () => {
    const res = await client.send();
  });
};
