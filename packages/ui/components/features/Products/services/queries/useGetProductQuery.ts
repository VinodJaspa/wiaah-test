import { createGraphqlRequestClient } from "api";
import { getRandomName, isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import {
  Account,
  AttachmentType,
  Exact,
  Maybe,
  PresentationType,
  Product,
  ProductAttributeDisplayType,
  ProductAttributeSelectionType,
  ProductPresentation,
  ProductSize,
  Profile,
  Scalars,
} from "@features/API";
import { UseQueryOptions, useQuery } from "react-query";

export type GetProductDetailsQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type GetProductDetailsQuery = {
  __typename?: "Query";
  getProduct: {
    __typename?: "Product";
    id: string;
    colors: Array<string>;
    sizes: Array<ProductSize>;
    price: number;
    title: string;
    seller: {
      __typename?: "Account";
      id: string;
      profile?: {
        __typename?: "Profile";
        username: string;
        verified: boolean;
        photo: string;
      } | null;
    };
    presentations: Array<{
      __typename?: "ProductPresentation";
      src: string;
      type: PresentationType;
    }>;
    attributes: Array<{
      __typename?: "ProductAttribute";
      displayType: ProductAttributeDisplayType;
      name: string;
      selectionType: ProductAttributeSelectionType;
      values: Array<{
        __typename?: "ProductAttributeValue";
        price: number;
        value: string;
      }>;
    }>;
  };
};
type args = GetProductDetailsQueryVariables;
export const getProductQueryDetailsKey = (args: args) => [
  "product-details",
  { args },
];

export const getProductqueryDetailsQueryFetcher = async (args: args) => {
  if (isDev) {
    const mockRes: GetProductDetailsQuery["getProduct"] = {
      colors: ["red", "green", "orange", "lime", "blue", "sky"],
      id: "",
      presentations: [{ src: getRandomImage(), type: PresentationType.Image }],
      price: randomNum(150),
      seller: {
        id: "13465",
        profile: {
          photo: getRandomImage(),
          username: getRandomName().firstName,
          verified: true,
        },
      },
      attributes: [
        {
          name: "Color",
          displayType: ProductAttributeDisplayType.Color,
          selectionType: ProductAttributeSelectionType.Single,
          values: [
            {
              price: 0,
              value: "#fff",
            },
            {
              price: 0,
              value: "#000",
            },
          ],
        },
      ],
      sizes: [
        ProductSize.S,
        ProductSize.M,
        ProductSize.L,
        ProductSize.Xl,
        ProductSize.Xxl,
      ],
      title: "Midnight Elegance",
    };

    return mockRes;
  }

  const client = createGraphqlRequestClient();
  const res = await client
    .setQuery(
      `
query getProductDetails($id:ID!){
  getProduct(id:$id){
    id
    seller{
      profile{
        username
        verified
        photo
      }
    }
    presentations{
      src
      type
    }
    attributes{
        displayType
        name
        selectionType
        values{
            price
            value
        }
    }
    colors
    sizes
    price
    title
  }
}
    `
    )
    .setVariables<GetProductDetailsQueryVariables>(args)
    .send<GetProductDetailsQuery>();

  return res.data.getProduct;
};

export const useGetProductDetailsQuery = (
  args: args,
  options?: UseQueryOptions<any, any, GetProductDetailsQuery["getProduct"], any>
) =>
  useQuery(
    getProductQueryDetailsKey(args),
    () => getProductqueryDetailsQueryFetcher(args),
    options
  );
