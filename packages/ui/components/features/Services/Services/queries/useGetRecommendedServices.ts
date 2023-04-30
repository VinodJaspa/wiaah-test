import { createGraphqlRequestClient } from "@UI/../api";
import { getRandomName, isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import {
  Exact,
  GetRecommendedServicesInput,
  Location,
  Maybe,
  Profile,
  Service,
  ServiceType,
  ServicesCursorPaginationResponse,
} from "@features/API";
import { UseInfiniteQueryOptions, useInfiniteQuery } from "react-query";

export type GetRecommendedServicesQueryVariables = Exact<{
  args: GetRecommendedServicesInput;
}>;

export type GetRecommendedServicesQuery = { __typename?: "Query" } & {
  getRecommendedServices: {
    __typename?: "ServicesCursorPaginationResponse";
  } & Pick<
    ServicesCursorPaginationResponse,
    "cursor" | "hasMore" | "nextCursor"
  > & {
      data: Array<
        { __typename?: "Service" } & Pick<
          Service,
          | "name"
          | "thumbnail"
          | "price"
          | "type"
          | "description"
          | "speciality"
          | "id"
          | "ingredients"
        > & {
            owner: { __typename?: "Account" } & {
              profile?: Maybe<
                { __typename?: "Profile" } & Pick<
                  Profile,
                  "username" | "photo" | "verified"
                >
              >;
              shop: { __typename?: "Shop" } & {
                location: { __typename?: "Location" } & Pick<
                  Location,
                  "address" | "country" | "city"
                >;
              };
            };
          }
      >;
    };
};

type args = GetRecommendedServicesQueryVariables["args"];
export const getRecommendedServicesQueryKey = (args: args) => [
  "recommended-services",
  { args },
];

export const getRecommendedServicesQueryFetcher = async (args: args) => {
  if (isDev) {
    const mockRes: GetRecommendedServicesQuery["getRecommendedServices"] = {
      cursor: args.cursor || "",
      data: [...Array(args.take)].map((_, i) => ({
        id: i.toString(),
        name: (() => {
          switch (args.type) {
            case ServiceType.Hotel:
              return "Tandjung S..";
            case ServiceType.HolidayRentals:
              return "Ocean Breeze Cottage";
            case ServiceType.HealthCenter:
              return "Dr. Ethan Ma..";
            case ServiceType.Vehicle:
              return "McLaren GT-20..";
            case ServiceType.BeautyCenter:
              return "Facials and skincare-Luxe Beau..";
            case ServiceType.Restaurant:
              return "Spaghetti carbonara";
            default:
              return "";
          }
        })(),
        owner: {
          shop: {
            location: {
              address: "address",
              city: "city",
              country: "Switzerland",
            },
          },
          profile: {
            photo: getRandomImage(),
            username: getRandomName().firstName,
            verified: true,
          },
        },
        description:
          "House size: 20,000 square feet, Number of bedrooms: 12, Number of bathrooms: 15, Indoor pool and 2468 Dogwood Drive, Dogwood Springs, Australia....",
        speciality: "Dentist",
        price: randomNum(250),
        thumbnail:
          "https://s3-alpha-sig.figma.com/img/17ae/cfba/e3bf1ee4c020b52eb776082483236ada?Expires=1683504000&Signature=CDj1JiSaUhhO7X4PQuTYVH4IQhMiGDbOPrmCSCedoZlXzTrwCQgrTM-bwgCNb88cOm6d21eRD8l8Hh6tHz5QH5rC1XNunFprey~~kLBD9PJUY-E7F9bT--wPiNfwQsYU7XrPynekeSx1y3jKC7Ll7bt0kjFSGyFO4KNju1Ok8b-JzginSIrFTzJx44Bq3WSqu199YB6XB3YPTYH9Gt1JSupFmTRjeprpykgYodZ79bc-iv~pv20iZxP4aCO45Lrv-h9Jmah6Kospvw0IE7YbEqiV8pkzbZZuAYmpupPwxj4uGyAuBBj3Tny5h7DLv-IM1A3bAu9ToXk9C9rkwJ2scg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
        type: ServiceType.Hotel,
      })),
      hasMore: false,
      nextCursor: "",
    };

    return mockRes;
  }

  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getRecommendedServices($args:GetRecommendedServicesInput!){
  getRecommendedServices(args:$args) {
    cursor
    hasMore
    nextCursor
    data{
      id
      name
      thumbnail
      price
      type
      ingredients
      description
      speciality
      owner{
        profile{
          username
          photo
          verified
        }
        shop{
          location{
            address
            country
            city
          }
        }
      }
    }
  }
}
    `
    )
    .setVariables<GetRecommendedServicesQueryVariables>({ args })
    .send<GetRecommendedServicesQuery>();

  return res.data.getRecommendedServices;
};

export const useGetRecommendedServices = (
  args: args,
  options?: UseInfiniteQueryOptions<
    GetRecommendedServicesQuery["getRecommendedServices"],
    any,
    GetRecommendedServicesQuery["getRecommendedServices"],
    any,
    any
  >
) =>
  useInfiniteQuery(
    getRecommendedServicesQueryKey(args),
    ({ pageParam }) =>
      getRecommendedServicesQueryFetcher({
        ...args,
        cursor: pageParam || args.cursor,
      }),
    options
  );
