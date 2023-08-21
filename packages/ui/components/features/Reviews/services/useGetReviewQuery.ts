import { createGraphqlRequestClient } from "api";
import { Exact } from "types";
import { UseQueryOptions, useQuery } from "react-query";

export type GetReviewByIdQueryVariables = Exact<{
  id: string;
}>;

export type GetReviewByIdQuery = {
  __typename?: "Query";
  adminGetProductReviewById: {
    __typename?: "ProductReview";
    id: string;
    message: string;
    productId: string;
    createdAt: any;
    rate: number;
    reviewer: {
      __typename?: "Account";
      id: string;
      firstName: string;
      lastName: string;
    };
    product: { __typename?: "Product"; title: string; id: string };
  };
};

export const getReviewQueryKey = (id: string) => ["get-review", { id }];

export const getReviewQueryFetcher = async (id: string) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getReviewById($id: String!) {
  adminGetProductReviewById(id: $id) {
    id
    message
    productId
    createdAt
    rate
    reviewer {
      id
      firstName
      lastName
    }
  }
}
`
    )
    .setVariables<GetReviewByIdQueryVariables>({ id })
    .send<GetReviewByIdQuery>();

  // product {
  //   title
  //   id
  // }
  return res.data.adminGetProductReviewById;
};

export const useGetReviewQuery = (
  id: string,
  options: UseQueryOptions<
    GetReviewByIdQueryVariables,
    any,
    GetReviewByIdQuery["adminGetProductReviewById"],
    any
  >
) => useQuery(getReviewQueryKey(id), () => getReviewQueryFetcher(id), options);
