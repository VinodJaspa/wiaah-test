import {
  Account,
  BookedService,
  Exact,
  GetMyBookingsInput,
  Maybe,
  Profile,
  Service,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetMyAppointmentsQueryVariables = Exact<{
  args: GetMyBookingsInput;
}>;

export type GetMyAppointmentsQuery = { __typename?: "Query" } & {
  getMyBookings: Array<
    { __typename?: "BookedService" } & Pick<
      BookedService,
      | "id"
      | "ownerId"
      | "serviceId"
      | "providerId"
      | "status"
      | "type"
      | "checkin"
      | "checkout"
      | "duration"
    > & {
        service: { __typename?: "Service" } & Pick<Service, "title">;
        buyer: { __typename?: "Account" } & Pick<Account, "email" | "phone"> & {
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

export const useGetMyAppointmentsQuery = (input: GetMyBookingsInput) => {
  const client = createGraphqlRequestClient();
  client.setQuery(`
query getMyAppointments(
    $args:GetMyBookingsInput!
){
    getMyBookings(
        args:$args
    ){
        id
        ownerId
        serviceId
        providerId
        status
        type
        checkin
        checkout
        duration
        service{
            title
        }
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
    `);

  client.setVariables<GetMyAppointmentsQueryVariables>({
    args: input,
  });

  return useQuery(["get-my-bookings", { input }], async () => {
    const res = await client.send<GetMyAppointmentsQuery>();

    return res.data.getMyBookings;
  });
};
