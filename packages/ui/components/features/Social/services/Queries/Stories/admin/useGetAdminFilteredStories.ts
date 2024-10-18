import { useQuery, QueryKey } from "react-query";
import { GraphQLClient } from "graphql-request";

// Define the type for the query arguments
type AdminFilteredStoriesArgs = {
  // Add specific argument types here, for example:
  // status?: string
  // category?: string
  // limit?: number
};

// Define the type for the query response
type AdminFilteredStoriesResponse = {
  // Define the structure of your response here, for example:
  // stories: Array<{
  //   id: string
  //   title: string
  //   content: string
  // }>
};

// Create a GraphQL client
const client = new GraphQLClient("YOUR_GRAPHQL_ENDPOINT");

// Define the query
const ADMIN_FILTERED_STORIES_QUERY = `
  query AdminFilteredStories($args: AdminFilteredStoriesInput!) {
    adminFilteredStories(input: $args) {
      # Add your fields here, for example:
      # id
      # title
      # content
    }
  }
`;

// Create a function to generate the query key
const getAdminFilteredStoriesQueryKey = (
  args: AdminFilteredStoriesArgs,
): QueryKey => ["adminFilteredStories", args];

// Create a function to fetch the data
const fetchAdminFilteredStories = async (
  args: AdminFilteredStoriesArgs,
): Promise<AdminFilteredStoriesResponse> => {
  const response = await client.request<AdminFilteredStoriesResponse>(
    ADMIN_FILTERED_STORIES_QUERY,
    { args },
  );
  return response;
};

// Create the custom hook
export const useAdminFilteredStories = (args: AdminFilteredStoriesArgs) => {
  return useQuery<AdminFilteredStoriesResponse, Error>(
    getAdminFilteredStoriesQueryKey(args),
    () => fetchAdminFilteredStories(args),
  );
};
