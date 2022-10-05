import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
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
} from "ui";
import { mapArray, randomNum, SeperatedStringArray } from "utils";

const ProductShop: NextPage = () => {
  const { t } = useTranslation();
  const { controls, changeTotalItems, pagination } = usePaginationControls();
  const categories: {
    name: string[];
    sortOrder: number;
    id: string;
  }[] = [...Array(50)].map((_, i) => ({
    id: i.toString(),
    name: [...Array(randomNum(3))]
      .map((_, i) => `category-${i}`)
      .concat("category"),
    sortOrder: randomNum(10),
  }));

  React.useEffect(() => {
    changeTotalItems(categories.length);
  }, [categories]);

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <p className="text-2xl">{t("Categories")}</p>
        </div>
        <div className="flex items-center gap-1">
          <span className="border text-lg flex justify-center items-center shadow rounded h-12 w-12">
            <RefreshIcon />
          </span>
          <span className="border text-lg  text-white flex justify-center items-center bg-primary shadow rounded h-12 w-12">
            <PlusIcon />
          </span>
          <span className="border text-lg  text-white flex justify-center items-center bg-secondaryRed shadow rounded h-12 w-12">
            <TrashIcon />
          </span>
        </div>
      </div>

      <div className="flex flex-col w-full shadow-lg border p-2 rounded-lg">
        <div className="flex items-center text-xl font-bold gap-2">
          <ListIcon className="text-base" />
          <p>{t("Category List")}</p>
        </div>
        <Table ThProps={{ className: "whitespace-nowrap" }} className="w-full">
          <THead>
            <Th align="left">
              <div className="flex w-full items-center gap-4">
                <Checkbox />
                <p>{t("Category Name")}</p>
              </div>
            </Th>
            <Th>{t("Sort Order")}</Th>
            <Th>{t("Action")}</Th>
          </THead>
          <TBody>
            {mapArray(
              categories.slice(
                pagination.page * pagination.take,
                (pagination.page + 1) * pagination.take
              ),
              ({ id, name, sortOrder }, i) => (
                <Tr>
                  <Td className="w-[99%]">
                    <div className="flex items-center gap-4 font-semibold">
                      <Checkbox />
                      <p>{SeperatedStringArray(name, " > ")}</p>
                    </div>
                  </Td>
                  <Td>{sortOrder}</Td>
                  <Td>
                    <div className="bg-primary flex justify-center items-center rounded text-white text-2xl h-12 w-12">
                      <EditIcon />
                    </div>
                  </Td>
                </Tr>
              )
            )}
          </TBody>
        </Table>
        <ItemsPagination controls={controls} />
      </div>
    </div>
  );
};

export default ProductShop;
