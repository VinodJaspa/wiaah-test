import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

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
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

enum ProductType {
  Goods = "goods",
  Digital = "digital",
}

enum VisibilityEnum {
  Hidden = "hidden",
  Public = "public",
}

enum ProductStatus {
  Suspended = "suspended",
  Active = "active",
  Pasued = "pasued",
  Pending = "pending",
}

enum CashbackType {
  Percent = "percent",
  Cash = "cash",
}

enum PresentationType {
  Video = "video",
  Image = "image",
}

export type CreateProductInput = {
  type: ProductType;
  title: Scalars["String"];
  description: Scalars["String"];
  categoryId: Scalars["ID"];
  attributes: Array<ProductAttributeInput>;
  stock: Scalars["Int"];
  discount: DiscountInput;
  cashback: CashBackInput;
  presentations: Array<ProductPresentationInput>;
  price: Scalars["Float"];
  brand: Scalars["String"];
  visibility: VisibilityEnum;
  status?: Maybe<ProductStatus>;
  vat: Scalars["Float"];
};

type ProductAttributeInput = {
  name: Scalars["String"];
  values: Array<Scalars["String"]>;
};

type DiscountInput = {
  units: Scalars["Int"];
  amount: Scalars["Int"];
};

type CashBackInput = {
  units: Scalars["Int"];
  amount: Scalars["Int"];
  type: CashbackType;
};

type ProductPresentationInput = {
  type: PresentationType;
  src: Scalars["String"];
};

type Product = {
  __typename?: "Product";
  id: Scalars["ID"];
  sellerId: Scalars["ID"];
  vendor_external_link: Scalars["String"];
  title: Scalars["String"];
  description: Scalars["String"];
  shopId: Scalars["ID"];
  categoryId: Scalars["ID"];
  rate: Scalars["Int"];
  brand: Scalars["String"];
  price: Scalars["Float"];
  visibility: VisibilityEnum;
  shippingRulesIds: Array<Scalars["ID"]>;
  reviews: Scalars["Int"];
  sales: Scalars["Int"];
  vat: Scalars["Float"];
};

export const useCreateNewProductMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
  mutation create(
    $input:$CreateProductInput
    ){
        createNewProduct(
            createNewProductInput:$input
        ){
            id
        }
    }
`);

  return useMutation<{ data: Product }, unknown, CreateProductInput, any>(
    "create-product",
    (data) => client.setVariables(data).send<Product>()
  );
};
