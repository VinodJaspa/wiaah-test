import {
  CashBack,
  Category,
  Discount,
  GetFilteredProductsInput,
  Product,
  ProductAttribute,
  ProductPresentation,
  QueryGetMyProductsArgs,
  ShippingDetails,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import { useQuery } from "react-query";

export type GetMyProductsQueryVariables = Exact<{
  args: GetFilteredProductsInput;
}>;

export type GetMyProductsQuery = { __typename?: "Query" } & {
  getMyProducts: Array<
    { __typename?: "Product" } & Pick<
      Product,
      | "brand"
      | "categoryId"
      | "description"
      | "earnings"
      | "id"
      | "price"
      | "rate"
      | "reviews"
      | "sales"
      | "sellerId"
      | "shippingRulesIds"
      | "shopId"
      | "stock"
      | "title"
      | "vat"
      | "vendor_external_link"
      | "visibility"
      | "thumbnail"
      | "status"
    > & {
        attributes: Array<
          { __typename?: "ProductAttribute" } & Pick<
            ProductAttribute,
            "name" | "values"
          >
        >;
        cashback: { __typename?: "CashBack" } & Pick<
          CashBack,
          "amount" | "type" | "units"
        >;
        category?: Maybe<
          { __typename?: "Category" } & Pick<
            Category,
            "id" | "name" | "parantId"
          >
        >;
        discount: { __typename?: "Discount" } & Pick<
          Discount,
          "amount" | "units"
        >;
        presentations: Array<
          { __typename?: "ProductPresentation" } & Pick<
            ProductPresentation,
            "src" | "type"
          >
        >;
        shippingDetails?: Maybe<
          { __typename?: "ShippingDetails" } & Pick<
            ShippingDetails,
            "country" | "shippingRulesIds"
          >
        >;
      }
  >;
};

export const useGetMyProducts = (args: GetFilteredProductsInput) => {
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
                thumbnail
                status
            }
        }
    `);

  return useQuery(["get-my-products", { args }], async () => {
    const res = await client
      .setVariables<QueryGetMyProductsArgs>({ filterInput: args })
      .send<GetMyProductsQuery>();
    return res.data.getMyProducts;
  });
};
