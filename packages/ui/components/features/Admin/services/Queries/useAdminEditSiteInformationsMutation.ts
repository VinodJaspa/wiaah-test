import { GraphQLClient } from "graphql-request";
import { useMutation, UseMutationResult } from "react-query";

// Define types for the mutation variables and response
type EditSiteInfoVariables = {
  // Add your variables here, for example:
  id: string;
  name: string;
  description: string;
};

type EditSiteInfoResponse = {
  // Define the response structure here, for example:
  editSiteInfo: {
    id: string;
    name: string;
    description: string;
  };
};

// Define your GraphQL mutation
const EDIT_SITE_INFO_MUTATION = `
  mutation EditSiteInfo($id: ID!, $name: String!, $description: String!) {
    editSiteInfo(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export const useAdminEditSiteInformationsMutation = (): UseMutationResult<
  EditSiteInfoResponse,
  Error,
  EditSiteInfoVariables
> => {
  const client = new GraphQLClient("/api/graphql"); // Adjust the endpoint as needed

  return useMutation<EditSiteInfoResponse, Error, EditSiteInfoVariables>(
    ["edit-site-info"],
    async (variables) => {
      try {
        const response = await client.request<EditSiteInfoResponse>(
          EDIT_SITE_INFO_MUTATION,
          variables,
        );
        return response;
      } catch (error) {
        throw new Error("Failed to edit site information");
      }
    },
  );
};
