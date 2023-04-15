import {
  Exact,
  Location,
  Maybe,
  Scalars,
  ServiceDayWorkingHours,
  Shop,
  SpecialDayWorkingHours,
  WorkingSchedule,
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
    | "name"
    | "phone"
    | "rating"
    | "reviews"
    | "thumbnail"
    | "type"
    | "storeType"
    | "verified"
  > & {
      location: { __typename?: "Location" } & Pick<
        Location,
        "address" | "city" | "country" | "lat" | "long" | "postalCode" | "state"
      >;
      workingSchedule: { __typename?: "WorkingSchedule" } & Pick<
        WorkingSchedule,
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
    ["shopDetails", { userId }],
    async () => {
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
    },
    options
  );
};
