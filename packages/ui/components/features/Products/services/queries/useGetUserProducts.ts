import { createGraphqlRequestClient } from "api";
import { isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import {
  Exact,
  GetSellerProductsInput,
  PresentationType,
  Product,
  ProductPresentation,
  ProductsCursorPaginationResponse,
} from "@features/API";
import {
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from "react-query";

export type GetUserProductsQueryVariables = Exact<{
  args: GetSellerProductsInput;
}>;

export type GetUserProductsQuery = { __typename?: "Query" } & {
  getSellerProducts: { __typename?: "ProductsCursorPaginationResponse" } & Pick<
    ProductsCursorPaginationResponse,
    "cursor" | "hasMore" | "nextCursor"
  > & {
    data: Array<
      Pick<Product, "id" | "price" | "title" | "description"> & {
        presentations: Array<
          { __typename?: "ProductPresentation" } & Pick<
            ProductPresentation,
            "src" | "type"
          >
        >;
      }
    >;
  };
};

type args = GetUserProductsQueryVariables["args"];

export const getUserProductsQueryKey = (args: args) => [
  "get-products",
  { args },
];

export const getUserProductsQueryFetcher = async (args: args) => {
  console.log("fetching user prods", args);
  if (isDev) {
    console.log("fetching user prods in dev", args);
    const mockRes: GetUserProductsQuery["getSellerProducts"] = {
      cursor: args.idCursor!,
      data: [...Array(5)].map(() => ({
        description: `watch features a unique "Eclipse" design, with a black mimics`,
        id: "",
        presentations: [
          { src: getRandomImage(), type: PresentationType.Image },
        ],
        price: randomNum(150),
        title: "Regaltime Grandeur",
      })),
      hasMore: true,
      nextCursor: "",
    };

    return mockRes;
  }

  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getUserProducts($args:GetSellerProductsInput!){
  getSellerProducts(args:$args){
    data {
			id
      price
      presentations{
        src
        type
      }
      title
      description
    }
    cursor
    hasMore
    nextCursor
  }
}
    `
    )
    .setVariables<GetUserProductsQueryVariables>({ args })
    .send<GetUserProductsQuery>();

  return res.data.getSellerProducts;
};

export const useGetUserProducts = (
  args: args,
  options?: UseInfiniteQueryOptions<
    GetUserProductsQuery["getSellerProducts"],
    any,
    GetUserProductsQuery["getSellerProducts"],
    any
  >
) =>
  useInfiniteQuery(
    getUserProductsQueryKey(args),
    async (pageArgs) =>
      getUserProductsQueryFetcher({
        ...args,
        idCursor: pageArgs.pageParam,
      }),
  );
