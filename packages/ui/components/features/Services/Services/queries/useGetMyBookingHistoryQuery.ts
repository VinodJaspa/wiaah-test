import {
  BeautyCenterTreatmentCategory,
  BookedService,
  BookedServiceStatus,
  Cashback,
  CashbackType,
  Discount,
  Dish,
  Doctor,
  Exact,
  GetBookingsHistoryInput,
  HealthCenterSpecialty,
  HotelRoom,
  Insurance,
  Maybe,
  Profile,
  Service,
  ServiceCancelationPolicy,
  ServiceLocation,
  ServiceType,
  Treatment,
} from "@features/API";
import { randomNum } from "@UI/../utils/src";
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
          { __typename?: "Service" } & Pick<
            Service,
            "id" | "name" | "price" | "thumbnail" | "ingredients"
          >
        >;
        doctor: { __typename?: "Service" } & Pick<
          Service,
          "id" | "name" | "speciality" | "thumbnail" | "rating" | "price"
        >;
        treatments: Array<
          { __typename?: "Service" } & Pick<
            Service,
            "id" | "duration" | "price" | "name"
          >
        >;
        insurance?: Maybe<
          { __typename?: "Insurance" } & Pick<Insurance, "amount">
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
      id
      name
      speciality
      thumbnail
      rating
      price
    }
    treatments{
      id
      duration
      price
      name
    }
    insurance{
      amount
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
          },
        },
        checkin: new Date().toString(),
        discount: {
          amount: 15,
          id: "test",
          units: 5,
          type: CashbackType.Cash,
        },
        dishs: [],
        guests: 1,
        seller: {
          profile: {
            photo: "profile (3).jfif",
            username: "seller name",
          },
        },
        service: {
          price: 48,
          title: "test service name",
        },
        status: BookedServiceStatus.Completed,
        treatments: [],
        type: ServiceType.Hotel,
        doctor: {
          name: "doc name",
          price: randomNum(150),
          rating: 4,
          thumbnail:
            "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
          speciality: {
            description: "eye",
            id: "test",
            name: "Eye",
          },
        },
        room: {
          bathrooms: 2,
          beds: 4,
          cancelationPolicies: [
            {
              cost: 4,
              duration: 2,
            },
          ],
          createdAt: new Date().toString(),
          dailyPrice: true,
          pricePerNight: 150,
          description: "room desc",
        },
        checkout: new Date(),
        insurance: {
          amount: randomNum(150),
        },
      }));

      return mockRes;

      const res = await client.send<GetMyBookingsQuery>();

      return res.data.getBookingHistory;
    }
  );
};
