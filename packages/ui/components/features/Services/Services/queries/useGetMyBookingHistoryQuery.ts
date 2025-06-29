import {
  BookedService,
  BookedServiceStatus,
  Cashback,
  CashbackType,
  Discount,
  Exact,
  GetBookingsHistoryInput,
  Insurance,
  Maybe,
  Profile,
  Service,
  ServiceType,
} from "@features/API";
import { isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetMyBookingsQueryVariables = Exact<{
  args: GetBookingsHistoryInput;
}>;

export type GetMyBookingsQuery = { __typename?: "Query" } & {
  getBookingHistory: Array<
    { __typename?: "BookedService" } & Pick<
      BookedService,
      | "id"
      | "checkout"
      | "checkin"
      | "status"
      | "type"
      | "guests"
      | "total"
      | "originalTotal"
      | "payment"
    > & {
        discount: { __typename?: "Cashback" } & Pick<
          Cashback,
          "id" | "amount" | "type" | "units"
        >;
        cashback: { __typename?: "Discount" } & Pick<
          Discount,
          "amount" | "units" | "id"
        >;
        buyer: { __typename?: "Account" } & {
          profile?: Maybe<
            { __typename?: "Profile" } & Pick<
              Profile,
              "username" | "photo" | "verified"
            >
          >;
        };
        seller: { __typename?: "Account" } & {
          profile?: Maybe<
            { __typename?: "Profile" } & Pick<
              Profile,
              "username" | "photo" | "verified"
            >
          >;
        };
        service?: Maybe<
          { __typename?: "Service" } & Pick<
            Service,
            "thumbnail" | "name" | "id"
          >
        >;
        insurance?: Maybe<
          { __typename?: "Insurance" } & Pick<Insurance, "amount" | "id">
        >;
      }
  >;
};

export const useGetMyBookingHistoryQuery = (
  args: GetMyBookingsQueryVariables["args"]
) => {
  const client = createGraphqlRequestClient();
  client.setQuery(`
query getMyBookings(
  $args:GetBookingsHistoryInput!
){
  getBookingHistory (
    args:$args
  ){
    id
    checkout
    checkin
    status
    type
    discount{
      id
      amount
      type
      units
    }
		cashback {
      amount
      units
      id
    }
    guests
    buyer{
      profile{
        username
        photo
        verified
      }
    }
    seller{
      profile{
        username
        photo
        verified
      }
    }
    service {
      thumbnail
      name
      id
    }
    total
    originalTotal
    payment
    insurance{
      amount
      id
    }
  }
}
    `);

  client.setVariables<GetMyBookingsQueryVariables>({
    args,
  });

  return useQuery<unknown, unknown, GetMyBookingsQuery["getBookingHistory"]>(
    ["my-booking-history", { args }],
    async () => {
      if (isDev) {
        const mockRes: GetMyBookingsQuery["getBookingHistory"] = [
          ...Array(2),
        ].map((v, i) => ({
          id: "test",
          cashback: {
            amount: 5,
            id: "test",
            units: 15,
          },
          buyer: {
            profile: {
              photo: "/profile (2).jfif",
              username: "buyer name",
              verified: true,
            },
          },
          checkin: new Date().toString(),
          discount: {
            amount: 15,
            id: "test",
            units: 5,
            type: CashbackType.Cash,
          },
          guests: 1,
          seller: {
            profile: {
              photo: "profile (3).jfif",
              username: "seller name",
              verified: true,
            },
          },
          service: {
            price: 48,
            name: "test service name",
            id: "",
            thumbnail: getRandomImage(),
          },
          status: BookedServiceStatus.Completed,
          treatments: [],
          type: ServiceType.Hotel,
          checkout: new Date(),
          insurance: {
            id: "",
            amount: randomNum(150),
          },
        }));

        return mockRes;
      }

      const res = await client.send<GetMyBookingsQuery>();

      return res.data.getBookingHistory;
    }
  );
};
