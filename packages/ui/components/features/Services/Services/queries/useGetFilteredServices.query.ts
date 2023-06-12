import {
  Exact,
  SearchServicesInput,
  ServiceAdaptation,
  ServiceType,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type SearchServicesQueryVariables = Exact<{
  args: SearchServicesInput;
}>;

export type SearchServicesQuery = {
  __typename?: "Query";
  searchServices: Array<{
    __typename?: "Service";
    id: string;
    name: string;
    price: number;
    type: ServiceType;
    adaptedFor?: Array<ServiceAdaptation> | null;
    airCondition?: boolean | null;
    bathrooms?: number | null;
    beds?: number | null;
    brand?: string | null;
    rating: number;
    description: string;
    thumbnail: string;
    shop: {
      __typename?: "Shop";
      location: {
        __typename?: "Location";
        address: string;
        city: string;
        country: string;
        lat: number;
        long: number;
        state: string;
      };
    };
  }>;
};

type args = SearchServicesQueryVariables["args"];
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
query searchServices($args: SearchServicesInput!) {
  searchServices(args: $args) {
    id
    name
    price
    type
    adaptedFor
    airCondition
    bathrooms
    beds
    brand
    rating
    thumbnail
    shop {
      location {
        address
        city
        country
        lat
        long
        state
      }
    }
  }
}
    `
      )
      .setVariables<SearchServicesQueryVariables>({
        args,
      })
      .send<SearchServicesQuery>();

    return res.data.searchServices;
  });
