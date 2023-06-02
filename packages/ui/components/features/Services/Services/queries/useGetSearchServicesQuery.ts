import { createGraphqlRequestClient } from "@UI/../api";
import { isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import {
  Exact,
  Location,
  Profile,
  SearchServicesInput,
  Service,
  Shop,
} from "@features/API";
import { getRandomHotelRoomName } from "@features/Statistics";
import { useQuery } from "react-query";

export type SearchServiceQueryVariables = Exact<{
  args: SearchServicesInput;
}>;

export type SearchServiceQuery = { __typename?: "Query" } & {
  searchServices: Array<
    { __typename?: "Service" } & Pick<
      Service,
      | "id"
      | "name"
      | "price"
      | "beds"
      | "bathrooms"
      | "adaptedFor"
      | "airCondition"
      | "brand"
      | "description"
      | "ingredients"
      | "cleaningFee"
      | "reviews"
      | "rating"
      | "thumbnail"
      | "sellerId"
    > & {
        shop: { __typename?: "Shop" } & Pick<Shop, "id"> & {
            location: { __typename?: "Location" } & Pick<
              Location,
              "address" | "city" | "country" | "lat" | "long" | "state"
            >;
            sellerProfile: { __typename?: "Profile" } & Pick<
              Profile,
              "username" | "photo"
            >;
          };
      }
  >;
};

type args = SearchServiceQueryVariables["args"];

export const getSearchServicesQueryKey = (args: args) => [
  "search-services",
  { args },
];

export const getSearchServicesQueryFetcher = async (args: args) => {
  if (isDev) {
    const mockRes: SearchServiceQuery["searchServices"] = [...Array(10)].map(
      () => ({
        id: "",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in",
        name: getRandomHotelRoomName(),
        price: randomNum(100),
        rating: 4,
        reviews: randomNum(150),
        sellerId: "",
        thumbnail: getRandomImage(),

        shop: {
          id: "",
          sellerProfile: {
            photo: getRandomImage(),
            username: "seller name",
          },
          location: {
            address: "address",
            city: "city",
            country: "country",
            lat: 15,
            long: 34,
            state: "state",
          },
        },
      })
    );

    return mockRes;
  }

  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query SearchService($args:SearchServicesInput!){
  searchServices(args:$args){
    id
    name
    price
    beds
    bathrooms
    adaptedFor
    airCondition
    brand
    description
    ingredients
    cleaningFee
    reviews
    thumbnail
    rating
    shop {
      id
      location {
        address
        city
        country
        lat
        long
        state
      }
      sellerProfile{
        username
        photo
      }
    }
    sellerId
  }
}
`
    )
    .setVariables<SearchServiceQueryVariables>({
      args,
    })
    .send<SearchServiceQuery>();

  return res.data.searchServices;
};

export const useGetSearchServicesQuery = (args: args) => {
  return useQuery(getSearchServicesQueryKey(args), () =>
    getSearchServicesQueryFetcher(args)
  );
};
