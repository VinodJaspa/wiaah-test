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
    return [...Array(15)].map((_, i) => ({
      id: i.toString(),
      comments: randomNum(150),
      createdAt: new Date().toString(),
      service: {
        hashtags: [],
        id: i.toString(),
        presentations: [
          { src: getRandomImage(), type: PresentationType.Image },
        ],
        price: randomNum(15),
        title: "title",
        cashback: {
          amount: randomNum(5),
          id: i.toString(),
          units: 5,
          type: CashbackType.Cash,
        },
        discount: {
          amount: randomNum(54),
          id: i.toString(),
          units: randomNum(56),
        },
        thumbnail:
          "https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
        rating: randomNum(5),
        serviceType: input.serviceType,
      },
      serviceType: input.serviceType,
      reactionNum: randomNum(56),
      shares: randomNum(5),
      userId: i.toString(),
      views: randomNum(546),
      user: {
        id: i.toString(),
        profile: {
          id: i.toString(),
          photo: getRandomImage(),
          profession: "profession",
          username: "name",
          verified: true,
          followers: randomNum(150),
        },
      },
      location: {
        city: "",
        country: "",
        address: "",
        state: "",
      },
    })) as GetServicePostSuggestionsQuery["getRecommendedServicePosts"];

    const res = await client.send<GetServicePostSuggestionsQuery>();

    return res.data.getRecommendedServicePosts;
  });
};
