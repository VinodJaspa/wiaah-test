import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import {
  Exact,
  ServiceCategory,
  ServiceCategoryFilter,
  ServiceCategoryFilterValue,
  TranslationText,
} from "@features/API";

export type GetServiceCategoriesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetServiceCategoriesQuery = { __typename?: "Query" } & {
  getServiceCategories: Array<
    { __typename?: "ServiceCategory" } & Pick<
      ServiceCategory,
      "id" | "sortOrder" | "status" | "slug" | "thumbnail"
    > & {
        name: Array<
          { __typename?: "TranslationText" } & Pick<
            TranslationText,
            "langId" | "value"
          >
        >;
        description: Array<
          { __typename?: "TranslationText" } & Pick<
            TranslationText,
            "langId" | "value"
          >
        >;
        seo: Array<
          { __typename?: "TranslationText" } & Pick<
            TranslationText,
            "langId" | "value"
          >
        >;
        filters: Array<
          { __typename?: "ServiceCategoryFilter" } & Pick<
            ServiceCategoryFilter,
            "filteringKey" | "sortOrder"
          > & {
              filterGroupName: Array<
                { __typename?: "TranslationText" } & Pick<
                  TranslationText,
                  "langId" | "value"
                >
              >;
              filterValues: Array<
                { __typename?: "ServiceCategoryFilterValue" } & Pick<
                  ServiceCategoryFilterValue,
                  "filteringValue" | "sortOrder"
                > & {
                    name: Array<
                      { __typename?: "TranslationText" } & Pick<
                        TranslationText,
                        "langId" | "value"
                      >
                    >;
                  }
              >;
            }
        >;
        metaTagDescription: Array<
          { __typename?: "TranslationText" } & Pick<
            TranslationText,
            "langId" | "value"
          >
        >;
        metaTagKeywords: Array<
          { __typename?: "TranslationText" } & Pick<
            TranslationText,
            "langId" | "value"
          >
        >;
        metaTagTitle: Array<
          { __typename?: "TranslationText" } & Pick<
            TranslationText,
            "langId" | "value"
          >
        >;
      }
  >;
};

export const useGetServiceCategoriesQuery = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getServiceCategories{
    getServiceCategories{
        id
        name {
          langId
          value
        }
        sortOrder
        status
      	description {
          langId
          value
        }
      seo{
        langId
        value
      }
      slug
      thumbnail
      filters{
        filterGroupName {
          langId
          value
        }
        filterValues{
          filteringValue
          name{
            langId
            value
          }
          sortOrder
        }
        filteringKey
        sortOrder
      }
      metaTagDescription {
        langId
        value
      }
      metaTagKeywords{
        langId
        value
      }
      metaTagTitle{
        langId
        value
      }
      
    }
}
    `);

  return useQuery(["service-categories"], async () => {
    const res = await client.send<GetServiceCategoriesQuery>();
    return res.data.getServiceCategories;
  });
};
