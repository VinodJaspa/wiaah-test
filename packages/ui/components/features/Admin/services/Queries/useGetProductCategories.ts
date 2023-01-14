import { Category } from "@features/Products";
import { createGraphqlRequestClient } from "api";
import { GqlResponse } from "types";
import { useQuery } from "react-query";

export const useGetProductCategories = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query {
        getProductCategories{
                id
                name
                parantId
                sortOrder
                status
            }
        }
    `);

  return useQuery("product-categories", async () => {
    const res = await client.send<
      GqlResponse<Category[], "getProductCategories">
    >();
    return res.data.getProductCategories;
  });
};
