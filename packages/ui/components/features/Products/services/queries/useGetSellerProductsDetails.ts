import { Scalars, createGraphqlRequestClient } from "api";
import { Exact, Product } from "../../../../features/API";
import { useQuery } from "react-query";

export type GetSellerProductsDetailsQueryVariables = Exact<{
  args: { sellerId: Scalars["ID"] };
}>;

export type GetSellerProductsDetailsQuery = { __typename?: "Query" } & {
  getSellerProductsDetails: { __typename?: "Products" } & Array<
    Pick<
      Product,
      | "title"
      | "thumbnail"
      | "price"
      | "stock"
      | "earnings"
      | "sales"
      | "totalOrdered"
      | "totalDiscounted"
      | "totalDiscountedAmount"
      | "unitsRefunded"
      | "id"
      | "positiveFeedback"
      | "reviews"
      | "negitiveFeedback"
      | "status"
      | "external_clicks"
    >
  >;
};

type args = GetSellerProductsDetailsQueryVariables["args"];

export const getSellerProductsDetailsQueryKey = (args: args) => [
  "get-products-details",
  { args },
];

export const getSellerProductsDetailsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getUserProducts($args:GetSellerProductsInput!){
  getSellerProductsDetails(args:$args){

    title
    thumbnail
    price
    stock
    earnings
    sales
    totalOrdered
    totalDiscounted
    totalDiscountedAmount
    unitsRefunded
    id
    positiveFeedback
    reviews
    negitiveFeedback
    status       
    external_clicks
  }
}
    `,
    )
    .setVariables<GetSellerProductsDetailsQueryVariables>({ args })
    .send<GetSellerProductsDetailsQuery>();

  return res.data.getSellerProductsDetails;
};

// export const useGetSellerProductsDetails = (
//   args: args,
//   options?: UseInfiniteQueryOptions<
//     GetSellerProductsDetailsQuery["getSellerProductsDetails"],
//     any,
//     GetSellerProductsDetailsQuery["getSellerProductsDetails"],
//     any
//   >
// ) =>
//   useInfiniteQuery(getSellerProductsDetailsQueryKey(args), async (pageArgs) =>
//     getSellerProductsDetailsQueryFetcher({
//       ...args,
//     })
//   );

export const useGetSellerProductsDetails = (args: args) =>
  useQuery(getSellerProductsDetailsQueryKey(args), () =>
    getSellerProductsDetailsQueryFetcher(args),
  );
