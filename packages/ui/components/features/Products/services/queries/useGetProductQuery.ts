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
  ProductPresentation,
  ProductSize,
  Profile,
  Scalars,
} from "@features/API";
import { UseQueryOptions, useQuery } from "react-query";

export type GetProductDetailsQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetProductDetailsQuery = { __typename?: "Query" } & {
  getProduct: { __typename?: "Product" } & Pick<
    Product,
    "id" | "colors" | "sizes" | "price" | "title"
  > & {
      seller: { __typename?: "Account" } & Pick<Account, "id"> & {
          profile?: Maybe<
            { __typename?: "Profile" } & Pick<
              Profile,
              "username" | "verified" | "photo"
            >
          >;
        };
      presentations: Array<
        { __typename?: "ProductPresentation" } & Pick<
          ProductPresentation,
          "src" | "type"
        >
      >;
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
