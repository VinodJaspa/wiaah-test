import { createGraphqlRequestClient } from "api";
import { Category } from "@features/Services/Services/types";
import { useQuery } from "react-query";
import { GqlResponse } from "@UI/../types/src";

export const useGetServiceCategory = (id: string) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getCategory(
            $id:String!
        ){
            getServiceCategoryById(
                categoryId:$id
            ){
                filters {
                    filterGroupName
                    filteringKey
                    filterValues {
                        filteringValue
                        name
                        sortOrder
                    }
                    sortOrder
                }
                id
                name
                sortOrder
                status
            }
        }
    `);

  return useQuery(
    ["service-category", { id }],
    async () => {
      const res = await client
        .setVariables({ id })
        .send<GqlResponse<Category, "getServiceCategoryById">>();

      return res.data.getServiceCategoryById;
    },
    { enabled: !!id }
  );
};
