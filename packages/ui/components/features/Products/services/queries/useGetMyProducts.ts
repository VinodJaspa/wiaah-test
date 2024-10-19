import {
  Cashback,
  CashbackType,
  Category,
  Discount,
  GetFilteredProductsInput,
  Product,
  ProductAttribute,
  ProductPresentation,
  ProductStatus,
  Profile,
  QueryGetMyProductsArgs,
  ShippingDetails,
  VisibilityEnum,
} from "../../../../features/API";
import { createGraphqlRequestClient } from "api";
import { Exact, Maybe } from "types";
import { useQuery } from "react-query";
import { isDev, randomNum } from "@UI/../utils/src";

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
      | "stock"
      | "title"
      | "vat"
      | "vendor_external_link"
      | "visibility"
      | "thumbnail"
      | "status"
      | "totalOrdered"
      | "totalDiscountedAmount"
      | "totalDiscounted"
      | "unitsRefunded"
      | "positiveFeedback"
      | "negitiveFeedback"
      | "external_clicks"
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
      seller: { __typename?: "Account" } & {
        profile?: Maybe<
          { __typename?: "Profile" } & Pick<Profile, "username">
        >;
      };
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
query getMyProducts($args:GetFilteredProductsInput!){
    getMyProducts(
      filterInput:$args
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
        seller{
          profile{
            username
          }
        }
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
        totalOrdered
        totalDiscountedAmount
        totalDiscounted
        unitsRefunded
        positiveFeedback
        negitiveFeedback
    }
}
    `);

  return useQuery(["get-my-products", { args }], async () => {
    if (isDev) {
      const ph: GetMyProductsQuery["getMyProducts"] = [...Array(8)].map(() => ({
        attributes: [],
        brand: "",
        cashback: {
          amount: 0,
          type: CashbackType.Cash,
          units: 1,
        },
        categoryId: "",
        description: "",
        discount: { amount: 0, units: 0 },
        earnings: 0,
        id: "test id",
        presentations: [],
        price: randomNum(650),
        rate: 0,
        reviews: 0,
        sales: 0,
        seller: {
          profile: {
            username: "test seller",
          },
        },
        sellerId: "test",
        shippingRulesIds: ["test"],
        external_clicks: randomNum(150),
        status: ProductStatus.Active,
        stock: 0,
        thumbnail: "/place-1.jpg",
        title: "test",
        vat: 0,
        vendor_external_link: "",
        visibility: VisibilityEnum.Public,
        negitiveFeedback: 15,
        positiveFeedback: 16,
        totalDiscounted: 15,
        totalDiscountedAmount: 150,
        totalOrdered: 160,
        unitsRefunded: 10,
      }));

      return ph;
    }

    const res = await client
      .setVariables<QueryGetMyProductsArgs>({ filterInput: args })
      .send<GetMyProductsQuery>();

    return res.data.getMyProducts;
  });
};
