import { GqlResponse } from "types";
import { createGraphqlRequestClient } from "api/src/utils";
import { ServiceMetaInfo } from "ui";
import { ServicePresentationInput, Account } from "ui/components/features/API";

// Define the response structure for the GraphQL query
export type GetHotelServiceMetaDataQuery = GqlResponse<
  {
    owner: Pick<Account, "id" | "firstName">;
    serviceMetaInfo: ServiceMetaInfo;
    presentation: ServicePresentationInput;
  },
  "getHotelMetaData"
>;

// Function to fetch hotel service details
export const getHotelServiceMetadataQuery = async (
  id: string,
): Promise<GetHotelServiceMetaDataQuery | undefined> => {
  // Initialize the GraphQL request client
  const client = createGraphqlRequestClient();

  // Define the GraphQL query
  const query = `
    query GetHotel($id: ID!) {
      getHotel(getHotelArgs: { id: $id }) {
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
      return response.data as GetHotelServiceMetaDataQuery;
    } else {
      console.error("Failed to fetch data: response is null");
    }
  } catch (error) {
    console.error("Error fetching hotel service details:", error);
  }
};
