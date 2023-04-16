import { isDev } from "@UI/../utils/src";
import {
  BusinessType,
  Exact,
  Location,
  Maybe,
  Scalars,
  ServiceType,
  Shop,
  ShopWorkingSchedule,
  SpecialDayWorkingHours,
  StoreType,
} from "@features/API";
import { ServiceDayWorkingHours } from "@features/Services";
import { createGraphqlRequestClient } from "api";
import { useQuery, UseQueryOptions } from "react-query";

export type GetShopDetailsQueryVariables = Exact<{
  userId: Scalars["String"];
}>;

export type GetShopDetailsQuery = { __typename?: "Query" } & {
  getUserShop: { __typename?: "Shop" } & Pick<
    Shop,
    | "banner"
    | "businessType"
    | "images"
    | "videos"
    | "createdAt"
    | "description"
    | "email"
    | "id"
    | "name"
    | "phone"
    | "rating"
    | "reviews"
    | "thumbnail"
    | "type"
    | "storeType"
    | "verified"
    | "ownerId"
  > & {
      location: { __typename?: "Location" } & Pick<
        Location,
        "address" | "city" | "country" | "lat" | "long" | "postalCode" | "state"
      >;
      workingSchedule: { __typename?: "WorkingSchedule" } & Pick<
        ShopWorkingSchedule,
        "sellerId" | "id"
      > & {
          weekdays: { __typename?: "WeekdaysWorkingHours" } & {
            fr?: Maybe<
              { __typename?: "ServiceDayWorkingHours" } & Pick<
                ServiceDayWorkingHours,
                "periods"
              >
            >;
            mo?: Maybe<
              { __typename?: "ServiceDayWorkingHours" } & Pick<
                ServiceDayWorkingHours,
                "periods"
              >
            >;
            sa?: Maybe<
              { __typename?: "ServiceDayWorkingHours" } & Pick<
                ServiceDayWorkingHours,
                "periods"
              >
            >;
            su?: Maybe<
              { __typename?: "ServiceDayWorkingHours" } & Pick<
                ServiceDayWorkingHours,
                "periods"
              >
            >;
            th?: Maybe<
              { __typename?: "ServiceDayWorkingHours" } & Pick<
                ServiceDayWorkingHours,
                "periods"
              >
            >;
            tu?: Maybe<
              { __typename?: "ServiceDayWorkingHours" } & Pick<
                ServiceDayWorkingHours,
                "periods"
              >
            >;
            we?: Maybe<
              { __typename?: "ServiceDayWorkingHours" } & Pick<
                ServiceDayWorkingHours,
                "periods"
              >
            >;
          };
          specialDays: Array<
            { __typename?: "SpecialDayWorkingHours" } & Pick<
              SpecialDayWorkingHours,
              "date"
            > & {
                workingHours: { __typename?: "ServiceDayWorkingHours" } & Pick<
                  ServiceDayWorkingHours,
                  "periods"
                >;
              }
          >;
        };
    };
};
export const getShopDetailsQueryKey = (userId: string) => [
  "shopDetails",
  { userId },
];

export const getShopDetailsQueryFetcher = async (userId: string) => {
  if (isDev) {
    const resMock: GetShopDetailsQuery["getUserShop"] = {
      storeType: StoreType.Service,
      type: ServiceType.Hotel,
      ownerId: "",
      banner: "",
      businessType: BusinessType.Individual,
      createdAt: new Date().toUTCString(),
      description: "test shop description",
      email: "test@email.com",
      id: "testid",
      images: [],
      location: {
        address: "address 1",
        city: "city",
        country: "country",
        lat: 45,
        long: 65,
        postalCode: "1546",
        state: "state",
      },
      name: "service name",
      phone: "1324658",
      rating: 5,
      reviews: 160,
      thumbnail: "",
      verified: true,
      videos: [],
      workingSchedule: {
        id: "",
        sellerId: "",
        specialDays: [],
        weekdays: {
          mo: {
            periods: [new Date().toUTCString(), new Date().toUTCString()],
          },
          tu: {
            periods: [new Date().toUTCString(), new Date().toUTCString()],
          },
          we: {
            periods: [new Date().toUTCString(), new Date().toUTCString()],
          },
          th: {
            periods: [new Date().toUTCString(), new Date().toUTCString()],
          },
          fr: {
            periods: [new Date().toUTCString(), new Date().toUTCString()],
          },
          sa: {
            periods: [new Date().toUTCString(), new Date().toUTCString()],
          },
          su: {
            periods: [new Date().toUTCString(), new Date().toUTCString()],
          },
        },
      },
    };

    return resMock;
  }

  const client = createGraphqlRequestClient();

  client.setQuery(`
query getShopDetails($userId:String!){
  getUserShop(userId:$userId){
    banner
    businessType
    images
    videos
    createdAt
    description
    location{
      address
      city
      country
      lat
      long
      postalCode
      state
    }
    email
    id
    ownerId
    name
    phone
    rating
    reviews
    thumbnail
    type
    storeType
    verified
    workingSchedule {
      weekdays{
        fr{
          periods
        }
        mo{
          periods
        }
        sa{
          periods
        }
        su{
          periods
        }
        th{
          periods
        }
        tu{
          periods
        }
        we{
          periods
        }
      }
      sellerId
      id
      specialDays{
        date
        workingHours{
          periods
        }
      }
    }
  }
}
    `);

  const res = await client
    .setVariables<GetShopDetailsQueryVariables>({ userId })
    .send<GetShopDetailsQuery>();

  return res.data.getUserShop;
};

export const useGetShopDetailsQuery = (
  userId: string,
  options?: UseQueryOptions<
    any,
    unknown,
    GetShopDetailsQuery["getUserShop"],
    any
  >
) => {
  return useQuery(
    getShopDetailsQueryKey(userId),
    () => getShopDetailsQueryFetcher(userId),
    options
  );
};
