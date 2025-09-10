import { getRandomName, isDev } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import {
  BusinessType,
  Exact,
  Location,
  Maybe,
  Profile,
  Scalars,
  ServiceDayWorkingHours,
  ServiceLocation,
  ServiceType,
  ServiceWorkingSchedule,
  Shop,
  ShopDayWorkingHours,
  ShopSpecialDayWorkingHours,
  ShopWorkingSchedule,
  StoreType,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery, UseQueryOptions } from "react-query";

export type GetShopDetailsQueryVariables = Exact<{
  userId: Scalars["String"]["input"];
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
    | "ownerId"
    | "name"
    | "phone"
    | "rating"
    | "reviews"
    | "thumbnail"
    | "type"
    | "storeType"
    | "verified"
  > & {
      sellerProfile: { __typename?: "Profile" } & Pick<
        Profile,
        "photo" | "username" | "ownerId" | "id"
      >;
      location: { __typename?: "ServiceLocation" } & Pick<
        ServiceLocation,
        "address" | "city" | "country" | "lat" | "lon" | "postalCode" | "state"
      > & { countryCode: string };

      workingSchedule?: Maybe<
        { __typename?: "WorkingSchedule" } & Pick<
          ServiceWorkingSchedule,
          "id"
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
          }
      >;
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
      type: ServiceType.Vehicle,
      ownerId: "",
      banner: "",
      businessType: BusinessType.Shop,
      createdAt: new Date().toUTCString(),
      description:
        "Welcome to our stunning hotel room, where luxury and natural beauty blend seamlessly together. As you step into the room, you're immediately struck by the breathtaking sunset views visible through the floor-to-ceiling windows.",
      email: "test@email.com",
      id: "testid",
      images: [...Array(10)].map(() => getRandomImage()),
      sellerProfile: {
        id: "",
        ownerId: "",
        photo: getRandomImage(),
        username: getRandomName().firstName,
      },
      location: {
        address: "Burj Al Arab Jumeirah Jumeira Road Umm Suqeim 3",
        city: "Dubai",
        country: "United Arab Emirates",
        lat: 45.464664,
        lon: 9.18854,
        postalCode: 1546,
        state: "state",
        countryCode: "AED",
      },
      name: "service name",
      phone: "1324658",
      rating: 5,
      reviews: 160,
      thumbnail: getRandomImage(),
      verified: true,
      videos: [],
      workingSchedule: {
        id: "",
        weekdays: {
          mo: {
            periods: [
              new Date(2023, 4, 15, 10).toUTCString(),
              new Date(2023, 4, 15, 18).toUTCString(),
            ],
          },
          tu: {
            periods: [
              new Date(2023, 4, 15, 10).toUTCString(),
              new Date(2023, 4, 15, 18).toUTCString(),
            ],
          },
          we: {
            periods: [
              new Date(2023, 4, 15, 10).toUTCString(),
              new Date(2023, 4, 15, 18).toUTCString(),
            ],
          },
          th: {
            periods: [
              new Date(2023, 4, 15, 10).toUTCString(),
              new Date(2023, 4, 15, 18).toUTCString(),
            ],
          },
          fr: {
            periods: [
              new Date(2023, 4, 15, 10).toUTCString(),
              new Date(2023, 4, 15, 18).toUTCString(),
            ],
          },
          sa: {
            periods: [
              new Date(2023, 4, 15, 10).toUTCString(),
              new Date(2023, 4, 15, 18).toUTCString(),
            ],
          },
          su: {
            periods: [
              new Date(2023, 4, 15, 10).toUTCString(),
              new Date(2023, 4, 15, 18).toUTCString(),
            ],
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
		sellerProfile {
      id
      photo
      username
      ownerId
    }
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
  >,
) => {
  return useQuery(
    getShopDetailsQueryKey(userId),
    () => getShopDetailsQueryFetcher(userId),
    options,
  );
};
