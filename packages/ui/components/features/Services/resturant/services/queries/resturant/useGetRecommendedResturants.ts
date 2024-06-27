import { createGraphqlRequestClient } from "api";
import { useQuery, UseQueryOptions } from "react-query";
import {
  Restaurant,
  SearchFilteredRestaurantInput,
} from "@features/Services/Services/types";
import { GqlResponse } from "@UI/../types/src";

export const useGetResturantsQuery = (args: SearchFilteredRestaurantInput) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
  query getRests(
    $args:SearchFilteredRestaurantInput!
){
    searchFilteredRestaurant(
        filtersInput:$args
    ){
        cuisinesTypeId
        establishmentTypeId
        id
        location{
            address
            city
            country
            lat
            lon
            postalCode
            state
        }
        menus{
            dishs{
                id
                ingredients
                name
                thumbnail
            }
            id
            name
        }
        michelin_guide_stars
        ownerId
        payment_methods
        policies{
            policyTitle
            terms
        }
        presentations{
            src
            type
        }
        serviceMetaInfo{
            description
            hashtags
            metaTagDescription
            metaTagKeywords
            title
        }
        setting_and_ambianceId
        status
        vat

    }
}
  `);

  client.setVariables({
    args,
  });

  return useQuery(["search-filtered-resturants", args], async () => {
    return (
      await client.send<GqlResponse<Restaurant[], "searchFilteredRestaurant">>()
    ).data.data.searchFilteredRestaurant;
  });
};
