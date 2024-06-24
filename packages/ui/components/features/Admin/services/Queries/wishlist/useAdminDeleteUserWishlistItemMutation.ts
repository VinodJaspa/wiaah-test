import { Exact, Mutation, Scalars } from "@features/API"; // Adjust based on your actual import structure
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

// Define the mutation variables and response types
export type AdminDeleteUserWishlistItemMutationVariables = Exact<{
  accountId: Scalars["String"]["input"];
}>;

export type AdminDeleteUserWishlistItemMutation = {
  __typename?: "Mutation";
} & {
  adminDeleteUserWishlistItem: boolean; // Adjust return type based on actual response type
};

// Define the custom hook for the mutation
export const useAdminDeleteUserWishlistItem = () =>
  useMutation<boolean, unknown, AdminDeleteUserWishlistItemMutationVariables>(
    // React Query key for caching and refetching purposes
    ["admin-delete-user-wishlist-item"], // Adjust key based on your naming convention
    async ({ accountId }) => {
      const client = createGraphqlRequestClient();

      // Construct GraphQL mutation query with variables
      const query = `
        mutation AdminDeleteUserWishlistItem($accountId: String!) {
          adminDeleteUserWishlistItem(accountId: $accountId)
        }
      `;

      // Send the GraphQL mutation request using the GraphQL client
      const response = await client
        .setQuery(query)
        .setVariables({ accountId })
        .send<AdminDeleteUserWishlistItemMutation>();

      // Return the result of the mutation
      return response.data.adminDeleteUserWishlistItem;
    }
  );
