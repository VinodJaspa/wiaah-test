import { GqlResponse } from "types";
import { createGraphqlRequestClient } from "api/src/utils";
import {
  Account,
  ServiceMetaInfo,
  ServicePresentationInput,
} from "ui/components/features/API";

// Define the response structure for the GraphQL query
export type GetBeautyCenterServiceMetaDataQuery = GqlResponse<
  {
    owner: Pick<Account, "id" | "firstName">;
    serviceMetaInfo: ServiceMetaInfo;
    presentation: ServicePresentationInput;
  },
  "getBeautyCenterMetaData"
>;

// Function to fetch beauty center service details
export const getBeautyCenterServiceMetadataQuery = async (
  id: string,
): Promise<GetBeautyCenterServiceMetaDataQuery | undefined> => {
  // Initialize the GraphQL request client
  const client = createGraphqlRequestClient();

  // Define the GraphQL query
  const query = `
    query GetBeautyCenter($id: ID!) {
      getBeautyCenter(getBeautyCenterArgs: { id: $id }) {
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
      return response.data as GetBeautyCenterServiceMetaDataQuery;
    } else {
      return undefined;
      console.error("Failed to fetch data: response is null");
    }
  } catch (error) {
    return error as GetBeautyCenterServiceMetaDataQuery;
    console.error("Error fetching beauty center service details:", error);
  }
};
