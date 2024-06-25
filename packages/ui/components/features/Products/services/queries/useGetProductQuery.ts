import { createGraphqlRequestClient } from "api";
import { getRandomName, isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import {
  Exact,
  PresentationType,
  ProductAttributeDisplayType,
  ProductAttributeSelectionType,
  ProductSize,
} from "@features/API";
import { UseQueryOptions, useQuery } from "react-query";

export type GetProductDetailsQueryVariables = Exact<{
  id: string;
}>;

export type GetProductDetailsQuery = {
  __typename?: "Query";
  getProduct: {
    __typename?: "Product";
    id: string;
    sizes: ProductSize[];
    colors: string[];
    price: number;
    title: string;
    seller: {
      __typename?: "Account";
      profile?: {
        __typename?: "Profile";
        id: string;
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
      id: string;
      displayType: ProductAttributeDisplayType;
      name: string;
      selectionType: ProductAttributeSelectionType;
      values: Array<{
        __typename?: "ProductAttributeValue";
        id: string;
        price?: number | null;
        name: string;
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
      id: "",
      sizes: [ProductSize.L],
      colors: ["green"],
      presentations: [{ src: getRandomImage(), type: PresentationType.Image }],
      price: randomNum(150),
      seller: {
        profile: {
          id: "2",
          photo: getRandomImage(),
          username: getRandomName().firstName,
          verified: true,
        },
      },
      attributes: [
        {
          id: "44",
          name: "Color",
          displayType: ProductAttributeDisplayType.Color,
          selectionType: ProductAttributeSelectionType.Single,
          values: [
            {
              price: 0,
              value: "#fff",
              id: "",
              name: "",
            },
            {
              price: 0,
              value: "#000",
              id: "",
              name: "",
            },
          ],
        },
      ],
      title: "Midnight Elegance",
    };

    return mockRes;
  }

  const client = createGraphqlRequestClient();
  const res = await client
    .setQuery(
      `
query getProductDetails($id: ID!) {
  getProduct(id: $id) {
    id
    seller {
      profile {
        username
        verified
        photo
      }
    }
    presentations {
      src
      type
    }
    attributes {
      displayType
      name
      selectionType
      values {
        id
        price
        name
        value
      }
    }
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
