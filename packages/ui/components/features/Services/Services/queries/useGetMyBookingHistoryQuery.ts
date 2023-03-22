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
          "name" | "thumbnail" | "rating" | "price" | "id"
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
      id
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
      }));

      return mockRes;

      const res = await client.send<GetMyBookingsQuery>();

      return res.data.getBookingHistory;
    }
  );
};
