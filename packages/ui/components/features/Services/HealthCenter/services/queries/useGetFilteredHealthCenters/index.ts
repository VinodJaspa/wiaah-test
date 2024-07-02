import { createGraphqlRequestClient } from "api";
import {
  HealthCenter,
  HealthCenterDoctor,
  SearchHealthCenterInput,
} from "@features/Services/Services/types";
import { useQuery } from "react-query";
import { GqlResponse } from "@UI/../types/src";

export const useGetFilteredHealthCenters = (args: SearchHealthCenterInput) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getHealthCenters(
    $args:SearchHealthCenterInput!
){
    searchHealthCenterDoctors(
        searchHealthCenterArgs:$args
    ){
        availablityStatus
        description
        healthCenterId
        id
        name
        price
        speciality{
            description
            id
            name
        }
        rating
        specialityId
        thumbnail
        healthCenter{

        cancelationPolicies{
            cost
            duration
        }
        contact{
            address
            city
            country
            email
            phone
            state
        }
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
        rating
        serviceMetaInfo{
            description
            hashtags
            metaTagDescription
            metaTagKeywords
            title
        }
        status
        totalReviews
        vat
        workingHours{
            id
            weekdays{
                fr{
                    periods
                }
                mo{
                    periods
                }
                sa{
                    periods
                }
                su{
                    periods
                }
                th{
                    periods
                }
                tu{
                    periods
                }
                we{
                    periods
                }
              }
            }
        }
    }
}
    `);

  client.setVariables({
    args,
  });

  return useQuery(["search-health-center", { args }], async () => {
    return (
      await client.send<
        GqlResponse<
          (HealthCenterDoctor & { healthCenter: HealthCenter })[],
          "searchHealthCenterDoctors"
        >
      >()
    ).data.data.searchHealthCenterDoctors;
  });
};
