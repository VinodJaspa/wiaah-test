import {
  HotelRoom,
  SearchHotelRoomLocationInput,
} from "@features/Services/Services";
import { createGraphqlRequestClient } from "api";
import { GqlResponse } from "@UI/../types/src";
import { isDev } from "@UI/../utils/src";
import { useQuery } from "react-query";

export type GetFilteredHotelRoomsQuery = { __typename?: "Query" } & {
  getSellerProductsDetails: { __typename?: "Products" } & Array<
    HotelRoom
  >;
};

export const useGetFilteredHotelRoomsQuery = (
  filters: SearchHotelRoomLocationInput
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getHotelRooms(
        $args:SearchHotelRoomLocationInput!
) {
    searchHotelRooms (
        searchHotelRoomsArgs:$args
    ){
        bathrooms
        beds
        cancelationPolicies{
            cost
            duration
        }
        createdAt
        dailyPrice
        dailyPrices{
            fr
            mo
            sa
            su
            th
            tu
            we
        }
        description
        discount{
            units
            value
        }
        extras{
            cost
            name
        }
        hotelId
        id
        includedAmenities
        includedServices
        measurements{
            inFeet
            inMeter
        }
        num_of_rooms
        popularAmenities{
            label
            value
        }
        presentations{
            src
            type
        }
        pricePerNight
        rating
        reviews
        sellerId
        title
        updatedAt
    }
}    


    `);

  client.setVariables({ args: filters })
    .send<GetFilteredHotelRoomsQuery>();

  return useQuery(
    ["hotel-rooms", filters],
    async () =>
      (await client.send<GqlResponse<HotelRoom[], "searchHotelRooms">>()).data.data.searchHotelRooms
  );
};
