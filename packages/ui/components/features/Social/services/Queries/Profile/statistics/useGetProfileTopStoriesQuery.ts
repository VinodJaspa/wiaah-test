import {
  Attachment,
  Exact,
  GetTopProfilePostsInput,
  Maybe,
  NewsfeedPost,
  Product,
  Service,
  Story,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetProfileTopStoriesQueryVariables = Exact<{
  args: GetTopProfilePostsInput;
}>;

export type GetProfileTopStoriesQuery = { __typename?: "Query" } & {
  getTopProfileStories: Array<
    { __typename?: "Story" } & Pick<
      Story,
      "id" | "createdAt" | "content" | "type" | "viewsCount" | "reactionsNum"
    > & {
        affiliationPost?: Maybe<
          { __typename?: "AffiliationPost" } & {
            affiliation: { __typename?: "Affiliation" } & {
              product?: Maybe<
                { __typename?: "Product" } & Pick<Product, "thumbnail">
              >;
              service?: Maybe<
                { __typename?: "Service" } & Pick<Service, "thumbnail">
              >;
            };
          }
        >;
        attachements?: Maybe<
          { __typename?: "Attachment" } & Pick<Attachment, "src" | "type">
        >;
        shopPost?: Maybe<
          { __typename?: "ProductPost" } & {
            product: { __typename?: "Product" } & Pick<Product, "thumbnail">;
          }
        >;
        servicePost?: Maybe<
          { __typename?: "ServicePost" } & {
            service?: Maybe<
              { __typename?: "Service" } & Pick<Service, "thumbnail">
            >;
          }
        >;
        newsfeedPost?: Maybe<
          { __typename?: "NewsfeedPost" } & Pick<NewsfeedPost, "attachments">
        >;
      }
  >;
};

type args = GetProfileTopStoriesQueryVariables["args"];
export const getProfileTopStoriesQueryKey = (args: args) => [
  "get-profile-top-stories",
  { args },
];

export const getProfileTopStoriesQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query GetProfileTopStories($args:GetTopProfilePostsInput!){
  	getTopProfileStories(args:$args){
    id
    createdAt
    content
    type
    viewsCount
    reactionsNum
    affiliationPost{
      affiliation{
        product{
          thumbnail
        }
        service{
          thumbnail
        }
      }
    }
    attachements{
      src
      type
    }
    shopPost{
      product{
        thumbnail
      }
    }
    servicePost {
      service{
        thumbnail
      }
    }
    newsfeedPost{
      attachments
    }
  }
}
    `
    )
    .setVariables<GetProfileTopStoriesQueryVariables>({
      args,
    })
    .send<GetProfileTopStoriesQuery>();

  return res.data.getTopProfileStories;
};

export const useGetProfileTopStoriesQuery = (args: args) =>
  useQuery(getProfileTopStoriesQueryKey(args), () =>
    getProfileTopStoriesQueryFetcher(args)
  );
