import {
  Exact,
  SearchServicesInput,
  ServiceAdaptation,
  ServiceType,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type SearchServiceQueryVariables = Exact<{
  args: SearchServicesInput;
}>;

export type SearchServiceQuery = {
  __typename?: "Query";
  searchServices: {
    __typename?: "ServiceSearchResponse";
    hasMore: boolean;
    total: number;
    data: Array<{
      __typename?: "Service";
      id: string;
      name: string;
      price: number;
      beds?: number | null;
      bathrooms?: number | null;
      adaptedFor?: Array<ServiceAdaptation> | null;
      airCondition?: boolean | null;
      brand?: string | null;
      description: string;
      ingredients?: Array<string> | null;
      cleaningFee?: number | null;
      reviews: number;
      thumbnail: string;
      rating: number;
      sellerId: string;
      type: ServiceType;
      shop: {
        __typename?: "Shop";
        id: string;
        location: {
          __typename?: "Location";
          address: string;
          city: string;
          country: string;
          lat: number;
          long: number;
          state: string;
        };
        sellerProfile: {
          __typename?: "Profile";
          username: string;
          photo: string;
        };
      };
    }>;
  };
};

type args = SearchServiceQueryVariables["args"];
export const getFilteredServicesQuery = (args: args) => [
  "get-filtered-services",
  { args },
];

export const useGetFilteredServicesQuery = (args: args) =>
  useQuery(getFilteredServicesQuery(args), async () => {
    const client = createGraphqlRequestClient();

    const res = await client
      .setQuery(
        `
query SearchService($args:SearchServicesInput!){
  searchServices(args:$args){
    data {      
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
        type
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
        sellerProfile {
            username
            photo
        }
      }
      sellerId
    }
    hasMore
    total
  }
}
    `
      )
      .setVariables<SearchServiceQueryVariables>({
        args,
      })
      .send<SearchServiceQuery>();

    return res.data.searchServices;
  });
