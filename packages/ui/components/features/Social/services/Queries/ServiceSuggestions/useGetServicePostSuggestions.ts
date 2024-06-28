import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import { useQuery } from "react-query";
import {
  CashbackType,
  GetRecommendedServicePostsInput,
  PostLocation,
  PresentationType,
  Profile,
  ServicePost,
  ServiceType,
} from "@features/API";
import { Account, Service } from "@features/API";
import { randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import { TypeOfService } from "@features/API/gql/generated";

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
      | "serviceType"
    > & {
        service: { __typename?: "Service" } & Pick<
          Service,
          "id" | "thumbnail" | "type" | "price" | "title"
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
  input: GetRecommendedServicePostsInput,
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
    return [...Array(15)].map((_, i) => ({
      id: "1",
      userId: "user123",
      comments: 10,
      reactionNum: 20,
      shares: 5,
      createdAt: "2024-06-28T12:00:00Z",
      views: 100,
      serviceType: TypeOfService.HotelRoom,
      service: {
        id: "service123",
        thumbnail: "https://example.com/thumbnail.jpg",
        type: ServiceType.Hotel,
        price: 100,
        title: "Luxury Hotel Stay",
      },
      location: {
        __typename: "PostLocation",
        address: "123 Main St",
        city: "New York",
        country: "USA",
        state: "NY",
      },
      user: {
        __typename: "Account",
        id: "user123",
        profile: {
          __typename: "Profile",
          id: "profile123",
          username: "example_user",
          verified: true,
          profession: "Travel Blogger",
          photo: "https://example.com/profile.jpg",
          followers: 50000,
        },
      },
    })) as GetServicePostSuggestionsQuery["getRecommendedServicePosts"];

    const res = await client.send<GetServicePostSuggestionsQuery>();

    return res.data.getRecommendedServicePosts;
  });
};
