import { Category } from "@features/API";
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
    return res.data.data.getProductCategories;
  });
};

export type ProductNestedCategory = Category & {
  subCategories: ProductNestedCategory[];
};

function appendSubCategories(
  cate: Category,
  ogArr: Category[]
): ProductNestedCategory[] {
  // const childs = ogArr.filter((v) => v.parantId === cate.id);

  // if (childs.length > 0) {
  //   return childs.map((c) => ({
  //     ...c,
  //     subCategories: appendSubCategories(c, ogArr),
  //   }));
  // } else return [{ ...cate, subCategories: [] }];
  return [];
}

export const FormatCategoryFilters = (categories: Category[]) => {
  return categories
    ?.filter((v) => !v.parantId)
    .map((v) => ({ ...v, subCategories: appendSubCategories(v, categories) }));
};
