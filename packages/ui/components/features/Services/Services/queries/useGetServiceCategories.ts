import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { Category } from "@features/Services/Services/types";
import { GqlResponse } from "types";

export type GetCategoriesQueryVariables = {};

export type GetCategoriesQuery = { __typename?: "Query" } & {
  getServiceCategories: Array<
    { __typename?: "Category" } & Pick<
      Category,
      "id" | "name" | "sortOrder" | "status" | "slug"
    >
  >;
};

export const useGetServiceCategoriesQuery = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query {
            getServiceCategories{
                id
                name
                sortOrder
                status
            }
        }
    `);

  return useQuery(["service-categories"], async () => {
    const res = await client.send<{ data: GetCategoriesQuery }>();
    return res.data.getServiceCategories;
  });
};
