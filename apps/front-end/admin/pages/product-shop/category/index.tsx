import { ProductCategoryStatus } from "@features/API";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  Checkbox,
  EditIcon,
  ListIcon,
  RefreshIcon,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  PlusIcon,
  TrashIcon,
  ItemsPagination,
  usePaginationControls,
  Button,
  Input,
  useGetAdminProductCategoriesQuery,
  GetProductCategoriesQuery,
} from "ui";
import { mapArray, SeperatedStringArray, useForm } from "utils";

const ProductShopCategory = () => {
  const { t } = useTranslation();
  const { controls, pagination } = usePaginationControls();
  const { form, inputProps } = useForm<
    Parameters<typeof useGetAdminProductCategoriesQuery>[0]
  >({ pagination });
  const { data: _data, refetch } = useGetAdminProductCategoriesQuery(form);
  const data = FAKE_PROD_CATE;
  const { visit, getCurrentPath } = useRouting();

  const categories =
    data?.reduce(
      (acc, { id, name, parantId, sortOrder }, i, og) => {
        const names = [name];
        let parent = parantId;

        while (parent) {
          const parentCategory = og.find((v) => v.id === parent);
          if (!parentCategory) break;
          names.unshift(parentCategory.name); // Add parent category name at the beginning
          parent = parentCategory.parantId; // Move to the next parent
        }

        return [
          ...acc,
          {
            name: names,
            sortOrder,
            id,
          },
        ];
      },
      [] as {
        name: string[];
        sortOrder: number;
        id: string;
      }[]
    ) || [];

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <p className="text-2xl">{t("Categories")}</p>
        </div>
        <div className="flex items-center gap-1">
          <span
            onClick={() => refetch()}
            className="border text-lg flex justify-center items-center shadow rounded h-12 w-12"
          >
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
          <span className="border text-lg  text-white flex justify-center items-center bg-secondaryRed shadow rounded h-12 w-12">
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
            <Th align="left">
              <div className="flex w-full items-center gap-4">
                <Checkbox />
                <p>{t("Category Name")}</p>
              </div>
            </Th>
            <Th>{t("Sort Order")}</Th>
            <Th>{t("Action")}</Th>
            <Tr>
              <Th>
                <Input
                  {...inputProps("name")}
                  placeholder={t("Type Category name")}
                />
              </Th>
              <Th>
                <Input {...inputProps("sortOrder")} type="number" />
              </Th>
            </Tr>
          </THead>
          <TBody>
            {mapArray(categories, ({ id, name, sortOrder }, i) => (
              <Tr>
                <Td className="w-[99%]">
                  <div className="flex items-center gap-4 font-semibold">
                    <Checkbox />
                    <p>{SeperatedStringArray(name, " > ")}</p>
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
                          .addQuery({ category_id: id })
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
        <ItemsPagination controls={controls} />
      </div>
    </div>
  );
};
export default ProductShopCategory;

const FAKE_PROD_CATE: GetProductCategoriesQuery["getFilteredProductCategories"] =
  [
    {
      __typename: "Category",
      id: "category1",
      name: "Electronics",
      parantId: "parent1",
      sortOrder: 1,
      status: ProductCategoryStatus.Active,
    },
    {
      __typename: "Category",
      id: "category2",
      name: "Clothing",
      parantId: "parent1",
      sortOrder: 2,
      status: ProductCategoryStatus.Active,
    },
    {
      __typename: "Category",
      id: "category3",
      name: "Books",
      parantId: "parent2",
      sortOrder: 3,
      status: ProductCategoryStatus.InActive,
    },
  ];
