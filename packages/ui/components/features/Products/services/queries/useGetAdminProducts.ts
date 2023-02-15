import { Exact } from "types";
import { createGraphqlRequestClient } from "api";
import {
  GetFilteredProductsAdminInput,
  Product,
  ProductStatus,
  ProductUsageStatus,
} from "@features/API";
import { useQuery } from "react-query";

export type GetAdminProductsQueryVariables = Exact<{
  args: GetFilteredProductsAdminInput;
}>;

export type GetAdminProductsQuery = { __typename?: "Query" } & {
  getAdminFilteredProducts: Array<
    { __typename?: "Product" } & Pick<
      Product,
      | "title"
      | "sellerId"
      | "id"
      | "price"
      | "stock"
      | "usageStatus"
      | "thumbnail"
      | "status"
      | "totalOrdered"
      | "totalDiscountedAmount"
      | "totalDiscounted"
      | "unitsRefunded"
      | "positiveFeedback"
      | "negitiveFeedback"
      | "updatedAt"
      | "sales"
      | "reviews"
      | "earnings"
    >
  >;
};

export const useGetAdminProductsQuery = (
  input: GetFilteredProductsAdminInput
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getAdminProducts(
        $args:GetFilteredProductsAdminInput!
    ){
        getAdminFilteredProducts(
            args:$args
        ){
            title
            sellerId
            id
            price
            stock
            usageStatus
            thumbnail
            status
            totalOrdered
            totalDiscountedAmount
            totalDiscounted
            unitsRefunded
            positiveFeedback
            negitiveFeedback
            sales
            reviews
            earnings
            updatedAt
        }
    }
    `);

  client.setVariables<GetAdminProductsQueryVariables>({
    args: input,
  });

  return useQuery(["get-admin-products", { input }], async () => {
    const res: GetAdminProductsQuery["getAdminFilteredProducts"] = [
      ...Array(5),
    ].map((_, i) => ({
      id: i.toString(),
      negitiveFeedback: 15,
      positiveFeedback: 35,
      price: 15,
      sellerId: "15",
      status: ProductStatus.Active,
      stock: 12,
      thumbnail: "/place-1.jpg",
      title: "title",
      totalDiscounted: 15,
      totalDiscountedAmount: 132,
      totalOrdered: 15,
      unitsRefunded: 48,
      usageStatus: ProductUsageStatus.New,
      updatedAt: new Date().toString(),
      reviews: 16,
      sales: 65,
      earnings: 156,
    }));
    return res;
  });
};
