import { createGraphqlRequestClient } from "api";
import {
  BookingCost,
  BookingCostService,
  Exact,
  GetBookingCostInput,
  Maybe,
  Service,
} from "@features/API";
import { UseQueryOptions, useQuery } from "react-query";

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
                | "bathrooms"
                | "beds"
                | "price"
                | "ingredients"
                | "menuType"
              >;
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
      }
    }
  }
}
    `
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
  >
) =>
  useQuery(
    getBookingCostQueryKey(args),
    () => getBookingCostQueryFetcher(args),
    options
  );
