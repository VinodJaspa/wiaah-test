import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { Category } from "@features/Services/Services/types";
import { GqlResponse } from "types";

export const useGetFilteredServiceCategoriesQuery = () => {
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

  return useQuery(["filtered-service-categories"], async () => {
    const res = await client.send<
      GqlResponse<Category[], "getServiceCategories">
    >();
    return res.data.getServiceCategories;
  });
};
