import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import { useQuery } from "react-query";
import {
  GetRecommendedServicePostsInput,
  PostLocation,
  Profile,
  ServicePost,
} from "@features/Social/services/types";
import { Account, Service } from "@features/Services";

export type GetServicePostSuggestionsQueryVariables = Exact<{
  args: GetRecommendedServicePostsInput;
}>;

export type GetServicePostSuggestionsQuery = { __typename?: "Query" } & {
  getRecommendedServicePosts: Array<
    { __typename?: "ServicePost" } & Pick<
      ServicePost,
      | "id"
      | "userId"
      | "comments"
      | "reactionNum"
      | "shares"
      | "createdAt"
      | "views"
      | "type"
    > & {
        service: { __typename?: "Service" } & Pick<
          Service,
          | "id"
          | "thumbnail"
          | "hashtags"
          | "serviceType"
          | "price"
          | "rating"
          | "title"
        >;
        location: { __typename?: "PostLocation" } & Pick<
          PostLocation,
          "address" | "city" | "country" | "state"
        >;
        user: { __typename?: "Account" } & Pick<Account, "id"> & {
            profile?: Maybe<
              { __typename?: "Profile" } & Pick<
                Profile,
                | "id"
                | "username"
                | "verified"
                | "profession"
                | "photo"
                | "followers"
              >
            >;
          };
      }
  >;
};

export const useGetServicePostSuggestionQuery = (
  input: GetRecommendedServicePostsInput
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getServicePostSuggestions(
        $args:GetRecommendedServicePostsInput!
    ){
        getRecommendedServicePosts(
            args:$args
        ){
            id
            userId
            comments
            reactionNum
            shares
            createdAt
            views
            type
            service {
                id
                thumbnail
                hashtags
                serviceType
                price
                rating
                title
            }
            location{
                address
                city
                country
                state
            }
            user{
                id
                profile{
                    id
                    photo
                    username
                    profession
                    verified
                    followers
                }
            }
        }
    }
    `);

  client.setVariables<GetServicePostSuggestionsQueryVariables>({
    args: input,
  });

  return useQuery(["get-service-post-suggestions"], async () => {
    const res = await client.send<GetServicePostSuggestionsQuery>();

    return res.data.getRecommendedServicePosts;
  });
};
