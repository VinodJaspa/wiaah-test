import { GqlResponse } from "types";
import { createGraphqlRequestClient } from "api/src/utils";
import { ServiceMetaInfo } from "@UI";
import { Account, ServicePresentationInput } from "@features/API";

// Define the response structure for the GraphQL query
export type GetVehicleServiceMetaDataQuery = GqlResponse<
  {
    owner: Pick<Account, "id" | "firstName">;
    serviceMetaInfo: ServiceMetaInfo;
    presentation: ServicePresentationInput;
  },
  "getVehicleMetaData"
>;

// Function to fetch vehicle service details
export const getVehicleServiceMetadataQuery = async (
  id: string,
): Promise<GetVehicleServiceMetaDataQuery> => {
  // Initialize the GraphQL request client
  const client = createGraphqlRequestClient();

  // Define the GraphQL query
  const query = `
    query GetVehicle($id: ID!) {
      getVehicle(getVehicleArgs: { id: $id }) {
        serviceMetaInfo {
          description
          hashtags
          metaTagDescription
          title
          metaTagKeywords
        }
        owner {
          id
          firstName
        }
        presentation {  
          type
          src
        }
      }
    }
  `;

  // Set the query and variables, then send the request
  client.setQuery(query);
  client.setVariables({ id });

  // Send the request and handle the response
  try {
    const response = await client.send();

    // Cast the response data to the correct type
    if (response && response.data) {
      return response.data as GetVehicleServiceMetaDataQuery;
    } else {
      console.error("Failed to fetch data: response is null");
    }
  } catch (error) {
    console.error("Error fetching vehicle service details:", error);
  }
};
