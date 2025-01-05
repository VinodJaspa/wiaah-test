import { ServiceCategoryStatus } from "@features/API";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  Button,
  EditIcon,
  Input,
  ListIcon,
  RefreshIcon,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  usePaginationControls,
  useGetServiceCategoriesQuery,
  getTranslationStateValue,
  GetServiceCategoriesQuery,
  Pagination,
  PlusIcon,
  TrashIcon,
} from "ui";
import { mapArray } from "utils";

const ServiceShopCategory = () => {
  const { t } = useTranslation();
  const { controls, pagination } = usePaginationControls();
  const { visit, getCurrentPath } = useRouting();
  const [lang, setLang] = React.useState("en");
  const { data: _categories, refetch } = useGetServiceCategoriesQuery();
  const categories = FAKE_CATEGORIES;

  return (
    <React.Fragment>
      <Head>
        <title>Admin | Service Category </title>
      </Head>
      <div className="flex flex-col w-full gap-8">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <p className="text-2xl">{t("Categories")}</p>
          </div>
          <div onClick={() => refetch()} className="flex items-center gap-1">
            <span className="border text-lg flex justify-center items-center shadow rounded h-12 w-12">
              <RefreshIcon />
            </span>

            <span
              onClick={() =>
                visit((r) => r.addPath(getCurrentPath()).addPath("form"))
              }
              className="border text-lg  text-white flex justify-center items-center bg-primary shadow rounded h-12 w-12"
            >
              <PlusIcon />
            </span>
            <span className="border text-lg text-white flex justify-center items-center bg-secondaryRed shadow rounded h-12 w-12">
              <TrashIcon />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full shadow-lg border p-2 rounded-lg">
          <div className="flex items-center text-xl font-bold gap-2">
            <ListIcon className="text-base" />
            <p>{t("Category List")}</p>
          </div>
          <Table
            TrProps={{ className: "" }}
            TdProps={{ className: "border" }}
            ThProps={{ className: "whitespace-nowrap border" }}
            className="w-full"
          >
            <THead>
              <Tr>
                <Th align="left">
                  <div className="flex w-full items-center gap-4">
                    {/* <Checkbox /> */}
                    <p>{t("Category Name")}</p>
                  </div>
                </Th>
                <Th>{t("Sort Order")}</Th>
                <Th>{t("Action")}</Th>
              </Tr>
              <Tr>
                <Th>
                  <Input placeholder={t("type category name")} />
                </Th>
                <Th>
                  <Input type={"number"} />
                </Th>
              </Tr>
            </THead>
            <TBody>
              {mapArray(categories, ({ id, name, sortOrder }, i) => (
                <Tr>
                  <Td className="w-[99%]">
                    <div className="flex items-center gap-4 font-semibold">
                      {/* <Checkbox /> */}
                      <p>
                        {name.find((v) => v.langId === lang)?.value ||
                          name[0]?.value}
                      </p>
                    </div>
                  </Td>
                  <Td>{sortOrder}</Td>
                  <Td>
                    <Button
                      onClick={() =>
                        visit((r) =>
                          r
                            .addPath(getCurrentPath({ noParams: true }))
                            .addPath("form")
                            .addQuery({ category_id: id }),
                        )
                      }
                      className="flex items-center justify-center  text-2xl h-12 w-12"
                    >
                      <EditIcon />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
          <Pagination controls={controls} />
        </div>
      </div>
    </React.Fragment>
  );
};
export default ServiceShopCategory;

const FAKE_CATEGORIES: GetServiceCategoriesQuery["getServiceCategories"] = [
  {
    __typename: "ServiceCategory",
    id: "1",
    slug: "sample-category",
    sortOrder: 1,
    status: ServiceCategoryStatus.Active,
    thumbnail: "https://example.com/thumbnail.jpg",
    name: [
      { __typename: "TranslationText", langId: "en", value: "Sample Category" },
    ],
    description: [
      {
        __typename: "TranslationText",
        langId: "en",
        value: "Description of Sample Category",
      },
    ],
    seo: [
      { __typename: "TranslationText", langId: "en", value: "SEO Description" },
    ],
    filters: [
      {
        __typename: "ServiceCategoryFilter",
        filteringKey: "color",
        sortOrder: 1,
        filterGroupName: [
          { __typename: "TranslationText", langId: "en", value: "Color" },
        ],
        filterValues: [
          {
            __typename: "ServiceCategoryFilterValue",
            filteringValue: "red",
            sortOrder: 1,
            name: [
              { __typename: "TranslationText", langId: "en", value: "Red" },
            ],
          },
          {
            __typename: "ServiceCategoryFilterValue",
            filteringValue: "blue",
            sortOrder: 2,
            name: [
              { __typename: "TranslationText", langId: "en", value: "Blue" },
            ],
          },
        ],
      },
    ],
    metaTagDescription: [
      {
        __typename: "TranslationText",
        langId: "en",
        value: "Meta Tag Description",
      },
    ],
    metaTagKeywords: [
      {
        __typename: "TranslationText",
        langId: "en",
        value: "Meta Tag Keywords",
      },
    ],
    metaTagTitle: [
      { __typename: "TranslationText", langId: "en", value: "Meta Tag Title" },
    ],
  },
];
