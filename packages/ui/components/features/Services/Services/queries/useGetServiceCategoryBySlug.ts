import { GqlResponse } from "types";
import { Category } from "@features/Services/Services/types";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export const useGetServiceCategoryBySlug = (slug: string) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getCategoryBySlug(
            $slug:String!
        ){
            getServiceCategoryBySlug(
                slug:$slug
            ){
                filters{
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
                slug
                sortOrder
                status
            }
        }
    `);

  client.setVariables({ slug });
  return useQuery(["service-category-by-slug", { slug }], async () => {
    const res = await client.send<
      GqlResponse<Category, "getServiceCategoryBySlug">
    >();

    return res.data.getServiceCategoryBySlug;
  });
};
