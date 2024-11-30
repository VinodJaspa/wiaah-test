import { GetFilteredProductsInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery, UseQueryOptions } from "react-query";

export type ProductOutput = {
  attributes: Array<{
    name: string;
    values: Array<string>;
  }>;
  brand: string;
  cashback: {
    amount: number;
    type: string;
    units: string;
  };
  categoryId: string;
  description: string;
  discount: {
    amount: number;
    units: string;
  };
  id: string;
  presentations: Array<{
    src: string;
    type: string;
  }>;
  price: number;
  rate: number;
  reviews: number;
  title: string;
  vat: number;
};

type GetProductsResponse = {
  data: {
    getProducts: ProductOutput[];
  };
};

export const useGetProductsQuery = (
  input: GetFilteredProductsInput,
  options?: UseQueryOptions<ProductOutput[], unknown>,
) => {
  const client = createGraphqlRequestClient();

  const query = `
    query getProducts($input: GetFilteredProductsInput!) {
      getProducts(args: $input) {
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
        discount {
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
  `;

  return useQuery<ProductOutput[], unknown>(
    ["getProducts", input],
    async () => {
      client.setQuery(query);
      client.setVariables({ input });
      const response = (await client.send()) as GetProductsResponse;
      return response.data.getProducts;
    },
    options,
  );
};
