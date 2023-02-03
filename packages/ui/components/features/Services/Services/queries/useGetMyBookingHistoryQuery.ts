import {
  BeautyCenterTreatmentCategory,
  BookedService,
  Cashback,
  Discount,
  Dish,
  Doctor,
  Exact,
  GetBookingsHistoryInput,
  HealthCenterSpecialty,
  HotelRoom,
  Maybe,
  Profile,
  Service,
  ServiceCancelationPolicy,
  ServiceLocation,
  Treatment,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetMyBookingsQueryVariables = Exact<{
  args: GetBookingsHistoryInput;
}>;

export type GetMyBookingsQuery = { __typename?: "Query" } & {
  getBookingHistory: Array<
    { __typename?: "BookedService" } & Pick<
      BookedService,
      "id" | "checkout" | "checkin" | "status" | "type" | "guests" | "payment"
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
            { __typename?: "Profile" } & Pick<Profile, "username" | "photo">
          >;
        };
        seller: { __typename?: "Account" } & {
          profile?: Maybe<
            { __typename?: "Profile" } & Pick<Profile, "username" | "photo">
          >;
        };
        service: { __typename?: "Service" } & Pick<
          Service,
          "price" | "title"
        > & {
            location: { __typename?: "ServiceLocation" } & Pick<
              ServiceLocation,
              | "address"
              | "city"
              | "country"
              | "lat"
              | "lon"
              | "postalCode"
              | "state"
            >;
          };
        room?: Maybe<
          { __typename?: "HotelRoom" } & Pick<
            HotelRoom,
            | "bathrooms"
            | "beds"
            | "createdAt"
            | "dailyPrice"
            | "description"
            | "pricePerNight"
          > & {
              cancelationPolicies: Array<
                { __typename?: "ServiceCancelationPolicy" } & Pick<
                  ServiceCancelationPolicy,
                  "cost" | "duration"
                >
              >;
            }
        >;
        dishs: Array<
          { __typename?: "Dish" } & Pick<
            Dish,
            "id" | "name" | "price" | "thumbnail" | "ingredients"
          >
        >;
        doctor: { __typename?: "Doctor" } & Pick<
          Doctor,
          "name" | "thumbnail" | "rating" | "price"
        > & {
            speciality?: Maybe<
              { __typename?: "HealthCenterSpecialty" } & Pick<
                HealthCenterSpecialty,
                "description" | "id" | "name"
              >
            >;
          };
        treatments: Array<
          { __typename?: "Treatment" } & Pick<
            Treatment,
            "id" | "duration" | "title" | "price"
          > & {
              category?: Maybe<
                { __typename?: "BeautyCenterTreatmentCategory" } & Pick<
                  BeautyCenterTreatmentCategory,
                  "title" | "id"
                >
              >;
            }
        >;
      }
  >;
};

export const useGetMyBookingsHistoryQuery = (
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
      }
    }
    seller{
      profile{
        username
        photo
      }
    }
    service{
      price
      title
    }
    payment
    room{
      bathrooms
      beds
      cancelationPolicies{
        cost
        duration
      }
      createdAt
      dailyPrice
      description
      pricePerNight
    }
    dishs{
      id
      name
      price
      thumbnail
      ingredients
    }
    doctor{
      name
      speciality{
        description
        id
        name
      }
      thumbnail
      rating
      price
    }
    treatments{
      id
      duration
      category{
        title
        id
      }
      title
      price
    }
  }
}
    `);

  client.setVariables<GetMyBookingsQueryVariables>({
    args,
  });

  return useQuery<unknown, unknown, GetMyBookingsQuery["getBookingHistory"]>([
    "my-booking-history",
    { args },
    async () => {
      const res = await client.send<GetMyBookingsQuery>();

      return res.data.getBookingHistory;
    },
  ]);
};
