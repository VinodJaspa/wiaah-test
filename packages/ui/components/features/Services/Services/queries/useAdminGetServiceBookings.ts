import { GraphQLClient } from "graphql-request";
import { useQuery, UseQueryOptions } from "react-query";

// Define more specific types
type AdminGetServiceBookingsArgs = {
  // Add specific arguments here, e.g.:
  // startDate?: string;
  // endDate?: string;
  // status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
};

type ServiceBooking = {
  id: string;
  // Add other fields here
};

type AdminGetServiceBookingsResponse = {
  adminGetServiceBookings: ServiceBooking[];
};

// GraphQL query
const ADMIN_GET_SERVICE_BOOKINGS_QUERY = `
  query AdminGetServiceBookings($args: AdminGetServiceBookingsInput!) {
    adminGetServiceBookings(input: $args) {
      id
      # Add other fields here
    }
  }
`;

// Create a function to get the GraphQL client
const getGraphQLClient = () => {
  return new GraphQLClient("YOUR_GRAPHQL_ENDPOINT");
};

// Query key factory
export const adminGetServiceBookingsQueryKey = (
  args: AdminGetServiceBookingsArgs,
) => ["admin-get-service-bookings", args];

// Query fetcher
export const adminGetServiceBookingsQueryFetcher = async (
  args: AdminGetServiceBookingsArgs,
): Promise<AdminGetServiceBookingsResponse> => {
  const client = getGraphQLClient();
  try {
    const data = await client.request<AdminGetServiceBookingsResponse>(
      ADMIN_GET_SERVICE_BOOKINGS_QUERY,
      { args },
    );
    return data;
  } catch (error) {
    console.error("Error fetching service bookings:", error);
    throw error;
  }
};

// Hook
export const useAdminGetServiceBookingsQuery = (
  args: AdminGetServiceBookingsArgs,
  options?: UseQueryOptions<AdminGetServiceBookingsResponse, Error>,
) => {
  return useQuery<AdminGetServiceBookingsResponse, Error>(
    adminGetServiceBookingsQueryKey(args),
    () => adminGetServiceBookingsQueryFetcher(args),
    options,
  );
};
