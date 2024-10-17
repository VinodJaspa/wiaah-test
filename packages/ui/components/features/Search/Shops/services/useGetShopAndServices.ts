import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

// Define the args type with necessary fields
type SearchShopsArgs = {
  searchTerm: string;
  location?: string;
  category?: string;
  limit?: number;
  offset?: number;
};

// Query key generator function
export const searchShopsQueryKey = (args: SearchShopsArgs) => [
  "search-shops",
  { args },
];

// Async fetcher for the search shops query
export const searchShopsQueryFetcher = async (args: SearchShopsArgs) => {
  const client = createGraphqlRequestClient();

  const query = `
    query SearchShops($searchTerm: String!, $location: String, $category: String, $limit: Int, $offset: Int) {
      searchShops(searchTerm: $searchTerm, location: $location, category: $category, limit: $limit, offset: $offset) {
        id
        name
        address
        category
      }
    }
  `;

  // Execute the GraphQL request
  const res = await client.setQuery(query).setVariables(args).send<{
    searchShops: {
      id: string;
      name: string;
      address: string;
      category: string;
    }[];
  }>();

  // Optionally handle errors or return data
  if (!res) {
    throw new Error("Failed to fetch shops");
  }

  return res.data.searchShops;
};

// Hook to use the search shops query
export const useSearchShopsQuery = (args: SearchShopsArgs) =>
  useQuery(searchShopsQueryKey(args), () => searchShopsQueryFetcher(args), {
    // Optionally configure react-query options
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
