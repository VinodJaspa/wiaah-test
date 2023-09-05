import { Exact, GetAdminFitleredProductReviewsInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetReviewsQueryVariables = Exact<{
  args: GetAdminFitleredProductReviewsInput;
}>;

export type AdminGetReviewsQuery = {
  __typename?: "Query";
  adminGetFilteredProductReviews: Array<{
    __typename?: "ProductReview";
    message: string;
    rate: number;
    createdAt: any;
    id: string;
    product: {
      __typename?: "Product";
      title: string;
      thumbnail: string;
      id: string;
      seller: {
        __typename?: "Account";
        id: string;
        profile?: {
          __typename?: "Profile";
          photo: string;
          username: string;
        } | null;
      };
    };
    reviewer: {
      __typename?: "Account";
      profile?: {
        __typename?: "Profile";
        username: string;
        photo: string;
        id: string;
      } | null;
    };
  }>;
};

type args = AdminGetReviewsQueryVariables["args"];

export const adminGetReviewsQueryKey = (args: args) => [
  "admin-get-reviews",
  { args },
];

export const adminGetReviewsFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetReviews($args: GetAdminFitleredProductReviewsInput!) {
  adminGetFilteredProductReviews(args: $args) {
    product {
      title
      thumbnail
      id
      seller {
        id
        profile {
          photo
          username
        }
      }
    }
    reviewer {
      profile {
        username
        photo
        id
      }
    }
    message
    rate
    createdAt
    id
  }
}
    `);

  const res = await client
    .setVariables<AdminGetReviewsQueryVariables>({ args })
    .send<AdminGetReviewsQuery>();

  return res.data.adminGetFilteredProductReviews;
};

export const useAdminGetProductReviews = (args: args) =>
  useQuery(adminGetReviewsQueryKey(args), () => adminGetReviewsFetcher(args));
