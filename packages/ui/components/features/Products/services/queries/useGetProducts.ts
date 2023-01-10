import {
  createGraphqlRequestClient,
  FormatedSearchableFilter,
  getProductsFetcher,
  QueryPaginationInputs,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType, GqlResponse } from "types";

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GetFilteredProductsInput = {
  categories?: Maybe<Array<Scalars["ID"]>>;
  minPrice?: Maybe<Scalars["Float"]>;
  maxPrice?: Maybe<Scalars["Float"]>;
  brands?: Maybe<Array<Scalars["ID"]>>;
  ratings?: Maybe<Array<Scalars["Int"]>>;
  colors?: Maybe<Array<Scalars["String"]>>;
  size?: Maybe<Array<Scalars["String"]>>;
  inStock?: Maybe<Scalars["Boolean"]>;
  pagination: GqlPaginationInput;
};

export type GqlPaginationInput = {
  page: Scalars["Int"];
  take: Scalars["Int"];
};

export type Product = {
  __typename?: "Product";
  id: Scalars["ID"];
  sellerId: Scalars["ID"];
  vendor_external_link: Scalars["String"];
  title: Scalars["String"];
  description: Scalars["String"];
  shopId: Scalars["ID"];
  categoryId: Scalars["ID"];
  category?: Maybe<Category>;
  attributes: Array<ProductAttribute>;
  stock: Scalars["Int"];
  discount: Discount;
  cashback: CashBack;
  presentations: Array<ProductPresentation>;
  rate: Scalars["Int"];
  brand: Scalars["String"];
  price: Scalars["Float"];
  visibility: VisibilityEnum;
  shippingRulesIds: Array<Scalars["ID"]>;
  shippingDetails?: Maybe<ShippingDetails>;
  reviews: Scalars["Int"];
  sales: Scalars["Int"];
  vat: Scalars["Float"];
};

export type Category = {
  __typename?: "Category";
  id: Scalars["ID"];
  name: Scalars["String"];
  parantId: Scalars["ID"];
};

export type ProductAttribute = {
  __typename?: "ProductAttribute";
  name: Scalars["String"];
  values: Array<Scalars["String"]>;
};

export type ShippingDetails = {
  __typename?: "ShippingDetails";
  country: Scalars["String"];
  shippingRulesIds: Array<Scalars["String"]>;
};

export type ProductPresentation = {
  __typename?: "ProductPresentation";
  type: PresentationType;
  src: Scalars["String"];
};

export enum PresentationType {
  Video = "video",
  Image = "image",
}

export type CashBack = {
  __typename?: "CashBack";
  units: Scalars["Int"];
  amount: Scalars["Int"];
  type: CashbackType;
};

export enum CashbackType {
  Percent = "percent",
  Cash = "cash",
}

export type Discount = {
  __typename?: "Discount";
  units: Scalars["Int"];
  amount: Scalars["Int"];
};

export enum VisibilityEnum {
  Hidden = "hidden",
  Public = "public",
}

type Res = GqlResponse<Product[], "getProducts">;

export const useGetProductsQuery = (
  input: GetFilteredProductsInput,
  options?: UseQueryOptions<unknown, unknown, Res, any>
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

  return useQuery<unknown, unknown, Res, any>(
    ["getProducts", input],
    () => client.send(),
    options
  );
};
