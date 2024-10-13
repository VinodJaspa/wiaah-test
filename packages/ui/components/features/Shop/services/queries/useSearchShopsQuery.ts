import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";

// Define the arguments for the query
type SearchShopsArgs = {
  keyword: string;
  location?: string;
};

// Define the response type
type Shop = {
  id: string;
  name: string;
  // Add other shop fields as needed
};

type SearchShopsResponse = {
  shops: Shop[];
};

// Generate a unique query key based on the arguments
export const searchShopsQueryKey = (args: SearchShopsArgs) => [
  "search-shops",
  args,
];

// Define the fetcher function
export const searchShopsQueryFetcher = async (
  args: SearchShopsArgs,
): Promise<SearchShopsResponse> => {
  const client = createGraphqlRequestClient();

  // Define the GraphQL query
  const query = `
    query SearchShops($keyword: String!, $location: String) {
      shops(keyword: $keyword, location: $location) {
        id
        name
        // Include other fields you need
      }
    }
  `;

  // Send the request with variables
  const res = await client.request<SearchShopsResponse>(query, args);
  return res;
};

// Create a custom hook that uses the fetcher
export const useSearchShopsQuery = (args: SearchShopsArgs) => {
  return useQuery(
    searchShopsQueryKey(args),
    () => searchShopsQueryFetcher(args),
    {
      enabled: !!args.keyword, // Only run the query if a keyword is provided
    },
  );
};
