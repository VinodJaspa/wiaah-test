// This query is not created yet
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

type Args = {}; // Define your args type appropriately

const getServiceRawDataQueryKey = (args: Args) => [
  "service-raw-data",
  { args },
];

type ResponseType = {};

const getServiceRawDataQueryFetcher = async (args: Args) => {
  const client = createGraphqlRequestClient(); // Assuming createGraphqlRequestClient returns your GraphQL client

  client.setQuery(`
  `);

  client.setVariables({ args }); // Set variables for the query

  const res = await client.send<ResponseType>(); // Adjust YourResponseType based on your GraphQL response type

  return res.data; // Assuming getServiceRawData is the field returned from your GraphQL query
};
export const useGetServiceRawDataQuery = (args: Args) => {
  return useQuery(getServiceRawDataQueryKey(args), () =>
    getServiceRawDataQueryFetcher(args),
  );
};
