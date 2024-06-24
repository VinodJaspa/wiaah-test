import { createGraphqlRequestClient } from "api";
import React from "react";
import { useQuery } from "react-query";

type Args = {
  id: string;
};

export const useAdminGetAccountProducts = (args: Args) =>
  useQuery(["admin-get-account-product", args], async () => {
    const client = createGraphqlRequestClient();

    // Example GraphQL query (replace with your actual query)
    const query = `
      query AdminGetAccountProducts($args: YourInputType) {
        adminGetAccountProducts(input: $args) {
          id
          name
        }
      }
    `;

    // Set the query and variables
    client.setQuery(query);
    client.setVariables({ args });

    // Send the request and handle response
    const res = await client.send();

    // Return data fetched from the GraphQL endpoint
    return res.data; // Adjust according to your GraphQL schema
  });
