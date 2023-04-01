import {
  Account,
  Exact,
  HotelRoom,
  Maybe,
  Profile,
  Scalars,
  Service,
  ServiceContact,
  ServiceLocation,
} from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";

export type GetAppointmentDetailsQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetAppointmentDetailsQuery = { __typename?: "Query" } & {
  getBookedServiceDetails: { __typename?: "BookedService" } & {
    room?: Maybe<
      { __typename?: "HotelRoom" } & Pick<HotelRoom, "title" | "pricePerNight">
    >;
    service: { __typename?: "Service" } & {
      location: { __typename?: "ServiceLocation" } & Pick<
        ServiceLocation,
        "address" | "city" | "country"
      >;
      contact: { __typename?: "ServiceContact" } & Pick<
        ServiceContact,
        "phone" | "email"
      >;
    };
    seller: { __typename?: "Account" } & Pick<Account, "id"> & {
        profile?: Maybe<{ __typename?: "Profile" } & Pick<Profile, "username">>;
      };
  };
};

export const useGetAppointmentDetailsQuery = (
  id: GetAppointmentDetailsQueryVariables["id"]
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getAppointmentDetails(
  	$id:String!
){
  getBookedServiceDetails(
    id:$id
  ){
    room{
      title
      pricePerNight
    }
    service{
      thumbnail
      title
      location{
        address
        city
        country
      }
      contact{
        phone
        email
      }
    }
    seller{
      id
      profile{
        username
      }
    }
  }
}
    `);

  client.setVariables<GetAppointmentDetailsQueryVariables>({
    id,
  });

  return useQuery(["appointment-details", { id }], async () => {
    const res = await client.send<GetAppointmentDetailsQuery>();

    return res.data.getBookedServiceDetails;
  });
};
