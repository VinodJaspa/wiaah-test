import { Exact, Maybe, Scalars } from "types";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import {
  Cashback,
  Category,
  Discount,
  Product,
  ProductAttribute,
  ProductPresentation,
  ShippingDetails,
} from "../../../../features/API";

export type GetProductQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetProductQuery = { __typename?: "Query" } & {
  adminGetProduct?: Maybe<
    { __typename?: "Product" } & Pick<
      Product,
      | "brand"
      | "categoryId"
      | "createdAt"
      | "description"
      | "id"
      | "price"
      | "rate"
      | "reviews"
      | "sales"
      | "sellerId"
      | "shippingRulesIds"
      | "status"
      | "stock"
      | "title"
      | "updatedAt"
      | "usageStatus"
      | "vat"
      | "vendor_external_link"
      | "visibility"
    > & {
      attributes: Array<
        { __typename?: "ProductAttribute" } & Pick<
          ProductAttribute,
          "name" | "values"
        >
      >;
      cashback: { __typename?: "Cashback" } & Pick<
        Cashback,
        "amount" | "type" | "units"
      >;
      category?: Maybe<
        { __typename?: "Category" } & Pick<
          Category,
          "id" | "name" | "parantId" | "sortOrder" | "status"
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

export const useAdminGetProductQuery = (id: string) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getProduct(
    $id:String!
){
    adminGetProduct(
        id:$id
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
            sortOrder
            status
        }
        categoryId
        createdAt
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
        sales
        sellerId
        shippingDetails{
            country
            shippingRulesIds
        }
        shippingRulesIds
        status
        stock
        title
        updatedAt
        usageStatus
        vat
        vendor_external_link
        visibility
    }
}
    `);

  client.setVariables<GetProductQueryVariables>({
    id,
  });

  return useQuery(["get-admin-product", { id }], async () => {
    const res = await client.send<GetProductQuery>();
    return res.data.adminGetProduct;
  });
};
