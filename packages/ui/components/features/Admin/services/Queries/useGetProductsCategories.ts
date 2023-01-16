import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import {
  GetFilteredCategory,
  QueryGetFilteredProductCategoriesArgs,
  Category,
} from "@features/Products/types";
import { GqlResponse } from "@UI/../types/src";

const getProductCategoriesFetcher = async (args: GetFilteredCategory) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getCategories (
        $args:GetFilteredCategory
    ){
        getFilteredProductCategories(
            args:$args
        ){
            id
            name
            parantId
            status
            sortOrder
        }
    }
  `);

  client.setVariables<QueryGetFilteredProductCategoriesArgs>({
    args,
  });

  const res = await client.send<
    GqlResponse<Category[], "getFilteredProductCategories">
  >();
  return res.data.getFilteredProductCategories;
};

export const useGetFilteredProductCategories = (args: GetFilteredCategory) => {
  return useQuery(["get-filtered-product-categories", { args }], () =>
    getProductCategoriesFetcher(args)
  );
};
