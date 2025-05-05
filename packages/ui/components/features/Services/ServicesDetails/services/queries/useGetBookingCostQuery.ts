import { createGraphqlRequestClient } from "api";
import {
  BookingCost,
  BookingCostService,
  Exact,
  GetBookingCostInput,
  Maybe,
  RestaurantDishType,
  Service,
  ServiceCancelationPolicy,
  ServiceExtra,
  ServiceType,
} from "@features/API";
import { UseQueryOptions, useQuery } from "react-query";
import { isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage, getRandomServiceImage } from "@UI/placeholder";

export type GetBookingCostQueryVariables = Exact<{
  args: GetBookingCostInput;
}>;

export type GetBookingCostQuery = { __typename?: "Query" } & {
  getBookingCost?: Maybe<
    { __typename?: "BookingCost" } & Pick<
      BookingCost,
      "total" | "subTotal" | "vatAmount" | "vatPercent"
    > & {
        services: Array<
          { __typename?: "BookingCostService" } & Pick<
            BookingCostService,
            "qty"
          > & {
              service: { __typename?: "Service" } & Pick<
                Service,
                | "id"
                | "thumbnail"
                | "type"
                | "name"
                | "num_of_rooms"
                | "beds"
                | "bathrooms"
                | "menuType"
                | "price"
              > & {
                  extras?: Maybe<
                    Array<
                      { __typename?: "ServiceExtra" } & Pick<
                        ServiceExtra,
                        "cost" | "name" | "id"
                      >
                    >
                  >;
                  cancelationPolicies?: Array<
                    { __typename?: "ServiceCancelationPolicy" } & Pick<
                      ServiceCancelationPolicy,
                      "id" | "cost" | "duration"
                    >
                  >;
                };
            }
        >;
      }
  >;
};

type args = GetBookingCostQueryVariables["args"];
export const getBookingCostQueryKey = (args: args) => [
  "get-booking-cost",
  { args },
];

export const getBookingCostQueryFetcher = async (args: args) => {
  if (isDev) {
    const mockRes: GetBookingCostQuery["getBookingCost"] = {
      services: [...Array(4)].map(() => {
        const menuType =
          Object.values(RestaurantDishType)[
            randomNum(Object.values(RestaurantDishType).length)
          ];
        return {
          qty: 3,
          service: {
            id: "test",
            name: "Dr. Margaret E. Carswell",
            price: 50,
            thumbnail:
              "https://media.istockphoto.com/id/506903162/photo/luxurious-villa-with-pool.jpg?b=1&s=612x612&w=0&k=20&c=vcCQ5L9Tt2ZurwFhtodR6njSUnMsEn_ZqEmsa0hs9lM=",
            type: ServiceType.HolidayRentals,
            menuType,
          },
        };
      }),
      subTotal: 150,
      vatAmount: 15,
      total: 165,
      vatPercent: 10,
    };

    return mockRes;
  }

  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getBookingCost($args:GetBookingCostInput!) {
	getBookingCost(args:$args){
    total
    subTotal
    vatAmount
    vatPercent
    services{
      qty
      service{
        id
        thumbnail
        type
        name
        num_of_rooms
        beds
        bathrooms
        menuType
        price
        extras {
          cost
          name
          id
        }
      }
    }
  }
}
    `,
    )
    .setVariables<GetBookingCostQueryVariables>({
      args,
    })
    .send<GetBookingCostQuery>();

  return res.data.getBookingCost;
};

export const useGetBookingCostQuery = (
  args: args,
  options?: UseQueryOptions<
    any,
    any,
    GetBookingCostQuery["getBookingCost"],
    any
  >,
) =>
  useQuery(
    getBookingCostQueryKey(args),
    () => getBookingCostQueryFetcher(args),
    options,
  );
