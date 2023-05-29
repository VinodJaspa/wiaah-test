import { getRandomName, isDev } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import {
  BusinessType,
  Exact,
  Location,
  Maybe,
  Profile,
  Scalars,
  ServiceType,
  Shop,
  ShopDayWorkingHours,
  ShopSpecialDayWorkingHours,
  ShopWorkingSchedule,
  StoreType,
} from "@features/API";
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
        "photo" | "username" | "ownerId"
      >;
      location: { __typename?: "Location" } & Pick<
        Location,
        "address" | "city" | "country" | "lat" | "long" | "postalCode" | "state"
      >;
      workingSchedule: { __typename?: "ShopWorkingSchedule" } & Pick<
        ShopWorkingSchedule,
        "sellerId" | "id"
      > & {
          weekdays: { __typename?: "ShopWeekdaysWorkingHours" } & {
            fr?: Maybe<
              { __typename?: "ShopDayWorkingHours" } & Pick<
                ShopDayWorkingHours,
                "periods"
              >
            >;
            mo?: Maybe<
              { __typename?: "ShopDayWorkingHours" } & Pick<
                ShopDayWorkingHours,
                "periods"
              >
            >;
            sa?: Maybe<
              { __typename?: "ShopDayWorkingHours" } & Pick<
                ShopDayWorkingHours,
                "periods"
              >
            >;
            su?: Maybe<
              { __typename?: "ShopDayWorkingHours" } & Pick<
                ShopDayWorkingHours,
                "periods"
              >
            >;
            th?: Maybe<
              { __typename?: "ShopDayWorkingHours" } & Pick<
                ShopDayWorkingHours,
                "periods"
              >
            >;
            tu?: Maybe<
              { __typename?: "ShopDayWorkingHours" } & Pick<
                ShopDayWorkingHours,
                "periods"
              >
            >;
            we?: Maybe<
              { __typename?: "ShopDayWorkingHours" } & Pick<
                ShopDayWorkingHours,
                "periods"
              >
            >;
          };
          specialDays: Array<
            { __typename?: "ShopSpecialDayWorkingHours" } & Pick<
              ShopSpecialDayWorkingHours,
              "date"
            > & {
                workingHours: { __typename?: "ShopDayWorkingHours" } & Pick<
                  ShopDayWorkingHours,
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
      description:
        "Welcome to our stunning hotel room, where luxury and natural beauty blend seamlessly together. As you step into the room, you're immediately struck by the breathtaking sunset views visible through the floor-to-ceiling windows.",
      email: "test@email.com",
      id: "testid",
      images: [...Array(10)].map(() => getRandomImage()),
      sellerProfile: {
        ownerId: "",
        photo: getRandomImage(),
        username: getRandomName().firstName,
      },
      location: {
        address: "Burj Al Arab Jumeirah Jumeira Road Umm Suqeim 3",
        city: "Dubai",
        country: "United Arab Emirates",
        lat: 45.464664,
        long: 9.18854,
        postalCode: "1546",
        state: "state",
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
        sellerId: "",
        specialDays: [],
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
  >
) => {
  return useQuery(
    getShopDetailsQueryKey(userId),
    () => getShopDetailsQueryFetcher(userId),
    options
  );
};
