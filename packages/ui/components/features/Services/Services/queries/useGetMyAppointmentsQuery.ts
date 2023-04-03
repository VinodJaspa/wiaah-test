import { getRandomName, isDev, randomNum } from "utils";
import {
  Account,
  BookedService,
  Exact,
  GetMyBookingsInput,
  Maybe,
  Profile,
  BookedServiceStatus,
  MyBookings,
  HotelRoom,
  Dish,
  Treatment,
  Vehicle,
  Doctor,
  HealthCenterSpecialty,
  ServiceType,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { UseInfiniteQueryOptions, useInfiniteQuery } from "react-query";

export type GetMyAppointmentsQueryVariables = Exact<{
  args: GetMyBookingsInput;
}>;

export type GetMyAppointmentsQuery = { __typename?: "Query" } & {
  getMyBookings: { __typename?: "MyBookings" } & Pick<
    MyBookings,
    "cursor" | "take"
  > & {
      data: Array<
        { __typename?: "BookedService" } & Pick<
          BookedService,
          | "id"
          | "ownerId"
          | "serviceId"
          | "providerId"
          | "status"
          | "type"
          | "checkin"
          | "duration"
        > & {
            room?: Maybe<
              { __typename?: "HotelRoom" } & Pick<HotelRoom, "title">
            >;
            dishs: Array<{ __typename?: "Dish" } & Pick<Dish, "name">>;
            treatments: Array<
              { __typename?: "Treatment" } & Pick<Treatment, "title">
            >;
            vehicle?: Maybe<
              { __typename?: "Vehicle" } & Pick<Vehicle, "title">
            >;
            doctor: { __typename?: "Doctor" } & Pick<Doctor, "name"> & {
                speciality?: Maybe<
                  { __typename?: "HealthCenterSpecialty" } & Pick<
                    HealthCenterSpecialty,
                    "name"
                  >
                >;
              };
            buyer: { __typename?: "Account" } & Pick<
              Account,
              "firstName" | "lastName" | "email" | "phone"
            > & {
                profile?: Maybe<
                  { __typename?: "Profile" } & Pick<
                    Profile,
                    "verified" | "photo" | "username"
                  >
                >;
              };
          }
      >;
    };
};

export const useGetMyAppointmentsQuery = (
  input: GetMyBookingsInput,
  options?: UseInfiniteQueryOptions<
    GetMyBookingsInput,
    any,
    GetMyAppointmentsQuery["getMyBookings"],
    any
  >
) => {
  return useInfiniteQuery(
    ["get-my-bookings", { input }],
    async ({ pageParam }) => {
      if (isDev) {
        const mockRes: GetMyAppointmentsQuery["getMyBookings"] = {
          take: (pageParam || input).days,
          cursor: (pageParam || input).date,
          data: [...Array((pageParam || input).days * randomNum(5))].map(
            (_, i) => ({
              room: {
                title: `Preumim Plus Room`,
              },
              dishs: [],
              doctor: { name: "" },
              treatments: [],
              vehicle: {
                title: "",
              },
              buyer: {
                firstName: getRandomName().firstName,
                lastName: getRandomName().lastName,
                email: "test@email.com",
                phone: "132-456-7984",
                profile: {
                  photo: "/profile (1).jfif",
                  username: "buyer name",
                  verified: true,
                },
              },
              checkin: new Date(
                new Date().setDate(new Date().getDate() + i)
              ).toString(),
              id: "test",
              ownerId: "test",
              providerId: "test",
              serviceId: "test",
              status: BookedServiceStatus.Pending,
              type: ServiceType.Hotel,
              duration: 4,
            })
          ),
        };

        return mockRes;
      }
      const client = createGraphqlRequestClient();
      client.setQuery(`
query getMyAppointments(
    $args:GetMyBookingsInput!
){
    getMyBookings(
        args:$args
    ){
    cursor
    take
    data{
        id
        ownerId
        serviceId
        providerId
        status
        type
        checkin
        duration
        buyer{
            email
            phone
            profile{
                verified
                photo
                username
            }
        }
    }
    }
}
    `);

      client.setVariables<GetMyAppointmentsQueryVariables>({
        args: pageParam || input,
      });

      const res = await client.send<GetMyAppointmentsQuery>();

      return res.data.getMyBookings;
    },
    options
  );
};
