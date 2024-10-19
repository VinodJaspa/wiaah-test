import { GetFilteredProductsInput } from "../../../../features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetProductsQuery = (
  input: GetFilteredProductsInput,
  options?: UseQueryOptions<unknown, unknown, any, any>,
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
  query getProducts(
    $input:GetFilteredProductsInput!
  ){
      getProducts(
          args:$input
      ){
          attributes {
              name
              values 
          }
          brand
          cashback {
              amount
              type
              units
          }
          categoryId
          description
          discount{
              amount
              units
          }
          id
          presentations {
              src
              type
          }
          price
          rate
          reviews
          title
          vat
      }
  }
  `);

  client.setVariables(input);

  return useQuery(["getProducts", input], () => client.send(), options);
};
