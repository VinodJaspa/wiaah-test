import { Product, QueryGetMyProductsArgs } from "@features/Products/types";
import { createGraphqlRequestClient } from "api";
import { GqlResponse } from "types";
import { useQuery } from "react-query";

export const useGetMyProducts = (args: QueryGetMyProductsArgs) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getMyProducts($args:GqlPaginationInput!){
    getMyProducts(
        args:$args
    ){
        attributes{
            name
            values
        }
        brand
        cashback{
            amount
            type
            units
        }
        category{
            id
            name
            parantId
        }
        categoryId
        description
        discount{
            amount
            units
        }
        earnings
        id
        presentations{
            src
            type
        }
        price
        rate
        reviews
        sales
        sellerId
        shippingDetails{
            country
            shippingRulesIds
        }
        shippingRulesIds
        shopId
        stock
        title
        vat
        vendor_external_link
        visibility
    }
}
    `);

  return useQuery(["get-my-products", { args }], async () => {
    const res = await client
      .setVariables({ args })
      .send<GqlResponse<Product[], "getMyProducts">>();
    return res.data.getMyProducts;
  });
};
