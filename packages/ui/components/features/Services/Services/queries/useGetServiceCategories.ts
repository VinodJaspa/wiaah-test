import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import {
  Exact,
  ServiceCategory,
  ServiceCategoryFilterValue,
  ServiceCategoryStatus,
  TranslationText,
} from "@features/API";
import { ServiceCategoryFilter } from "@features/API/gql/generated";
import { isDev } from "@UI/../utils/src";

export type GetServiceCategoriesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetServiceCategoriesQuery = { __typename?: "Query" } & {
  getServiceCategories: Array<
    { __typename?: "ServiceCategory" } & { slug: string } & Pick<
        ServiceCategory,
        "id" | "sortOrder" | "status" | "thumbnail"
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
    if (isDev) {
      const res = [
        {
          id: "",
          description: "",
          filters: [
            {
              filterGroupName: "test",
              filteringKey: "test",
              filterValues: [],
              sortOrder: 5,
            },
          ],
          metaTagDescription: "",
          metaTagKeywords: [{ value: "data", langId: "" }],
          metaTagTitle: [{ langId: "" }],
          name: [{ langId: "tes", value: "Hotel" }],
          seo: [{ langId: "test", value: "test" }],
          slug: "healthcenter",
          sortOrder: 5,
          status: ServiceCategoryStatus.Active,
          thumbnail: "",
        },
        {
          id: "",
          description: "",
          filters: [
            {
              filterGroupName: "test",
              filteringKey: "test",
              filterValues: [],
              sortOrder: 5,
            },
          ],
          metaTagDescription: "",
          metaTagKeywords: [{ value: "data", langId: "" }],
          metaTagTitle: [{ langId: "" }],
          name: [{ langId: "tes", value: "Holiday Rentals" }],
          seo: [{ langId: "test", value: "test" }],
          slug: "healthcenter",
          sortOrder: 5,
          status: ServiceCategoryStatus.Active,
          thumbnail: "",
        },
        {
          id: "",
          description: "",
          filters: [
            {
              filterGroupName: "test",
              filteringKey: "test",
              filterValues: [],
              sortOrder: 5,
            },
          ],
          metaTagDescription: "",
          metaTagKeywords: [{ value: "data", langId: "" }],
          metaTagTitle: [{ langId: "" }],
          name: [{ langId: "tes", value: "Restaruant" }],
          seo: [{ langId: "test", value: "test" }],
          slug: "healthcenter",
          sortOrder: 5,
          status: ServiceCategoryStatus.Active,
          thumbnail: "",
        },
        {
          id: "",
          description: "",
          filters: [
            {
              filterGroupName: "test",
              filteringKey: "test",
              filterValues: [],
              sortOrder: 5,
            },
          ],
          metaTagDescription: "",
          metaTagKeywords: [{ value: "data", langId: "" }],
          metaTagTitle: [{ langId: "" }],
          name: [{ langId: "tes", value: "Health Center" }],
          seo: [{ langId: "test", value: "test" }],
          slug: "healthcenter",
          sortOrder: 5,
          status: ServiceCategoryStatus.Active,
          thumbnail: "",
        },
        {
          id: "",
          description: "",
          filters: [
            {
              filterGroupName: "test",
              filteringKey: "test",
              filterValues: [],
              sortOrder: 5,
            },
          ],
          metaTagDescription: "",
          metaTagKeywords: [{ value: "data", langId: "" }],
          metaTagTitle: [{ langId: "" }],
          name: [{ langId: "tes", value: "Beauty Center" }],
          seo: [{ langId: "test", value: "test" }],
          slug: "healthcenter",
          sortOrder: 5,
          status: ServiceCategoryStatus.Active,
          thumbnail: "",
        },
        {
          id: "",
          description: "",
          filters: [
            {
              filterGroupName: "test",
              filteringKey: "test",
              filterValues: [],
              sortOrder: 5,
            },
          ],
          metaTagDescription: "",
          metaTagKeywords: [{ value: "data", langId: "" }],
          metaTagTitle: [{ langId: "" }],
          name: [{ langId: "tes", value: "Vehicle" }],
          seo: [{ langId: "test", value: "test" }],
          slug: "healthcenter",
          sortOrder: 5,
          status: ServiceCategoryStatus.Active,
          thumbnail: "",
        },
      ] as unknown as GetServiceCategoriesQuery["getServiceCategories"];

      return res;
    }
    const res = await client.send<GetServiceCategoriesQuery>();

    return res.data.getServiceCategories;
  });
};
