import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectOption } from "ui";
export interface ItemsPaginationProps {
  controls: usePaginationControls;
}

export type usePaginationControlsOptions = {
  itemsPerPage: number;
};
export type usePaginationControls = {
  next: () => void;
  previous: () => void;
  changeItemsPerPage: (itemsNum: number) => void;
  changePage: (pageNum: number) => void;
  totalItems: number;
  itemsPerPage: number;
  page: number;
};

export const usePaginationControls = (
  options: usePaginationControlsOptions = { itemsPerPage: 10 }
) => {
  const { itemsPerPage } = options;
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [pagination, setPagination] = React.useState<{
    take: number;
    page: number;
  }>({ page: 1, take: itemsPerPage });

  function next() {
    setPagination((state) => ({ ...state, page: state.page + 1 }));
  }
  function previous() {
    setPagination((state) => ({ ...state, page: state.page - 1 }));
  }

  function changeItemsPerPage(itemsNum: number) {
    setPagination((state) => ({ ...state, take: itemsNum }));
  }
  function changePage(pageNum: number) {
    setPagination((state) => ({ ...state, page: pageNum }));
  }

  function changeTotalItems(totalItems: number) {
    setTotalItems(totalItems);
  }
  const controls: usePaginationControls = {
    changeItemsPerPage,
    next,
    previous,
    changePage,
    page: pagination.page,
    itemsPerPage: pagination.take,
    totalItems: totalItems || 0,
  };

  return {
    pagination,
    controls,
    changeTotalItems,
  };
};

export const ItemsPagination: React.FC<ItemsPaginationProps> = ({
  controls = {
    changeItemsPerPage() {},
    changePage() {},
    next() {},
    previous() {},
    itemsPerPage: 10,
    page: 0,
    totalItems: 0,
  },
}) => {
  const { changeItemsPerPage, itemsPerPage, next, page, previous, totalItems } =
    controls;
  const { t } = useTranslation();

  function handleItemsPerPageChange(value: string) {
    changeItemsPerPage(parseInt(value));
  }

  return (
    <div className="text-md md:text-lg lg:text-xl w-full flex items-center gap-4 text-gray-500 justify-end">
      <p>{t("items_per_page", "Items Per Page")}</p>
      <Select
        onOptionSelect={handleItemsPerPageChange}
        className={"w-fit min-w-[4rem]"}
      >
        {[...Array(10)].map((_, i) => (
          <SelectOption className="whitespace-nowrap" value={i + 1}>
            {i + 1}
          </SelectOption>
        ))}
      </Select>
      <p>
        {page} {t("of", "of")}{" "}
        {totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : "Unkown"}
      </p>
      <div className="flex gap-2 items-center">
        <ChevronLeftIcon
          onClick={() => {
            previous && previous();
          }}
          className="text-gray-500 bg-white text-xl cursor-pointer"
        />
        <ChevronRightIcon
          onClick={() => {
            next && next();
          }}
          className="text-gray-500 bg-white text-xl cursor-pointer"
        />
      </div>
    </div>
  );
};
