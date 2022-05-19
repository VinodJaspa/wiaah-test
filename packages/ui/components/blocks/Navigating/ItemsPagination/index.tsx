import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectOption } from "ui";
export interface ItemsPaginationProps {
  currentPage: number;
  maxItemsNum?: number;
  onNextClick?: (currentPage: number) => any;
  onPrevClick?: (currentPage: number) => any;
  onItemsPerPageChange?: (itemsPerPage: number) => any;
}

export const ItemsPagination: React.FC<ItemsPaginationProps> = ({
  currentPage,
  maxItemsNum = 0,
  onItemsPerPageChange,
  onNextClick,
  onPrevClick,
}) => {
  const { t } = useTranslation();
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(5);
  function handleItemsPerPageChange(value: string) {
    setItemsPerPage(parseInt(value));
  }
  React.useEffect(() => {
    onItemsPerPageChange && onItemsPerPageChange(itemsPerPage);
  }, [itemsPerPage]);
  return (
    <div className="text-md md:text-lg lg:text-xl w-full flex items-center gap-4 text-gray-500 justify-end">
      <p>{t("items_per_page", "Items Per Page")}</p>
      <Select
        onOptionSelect={handleItemsPerPageChange}
        className={"w-fit min-w-[4rem]"}
      >
        {[...Array(10)].map((_, i) => (
          <SelectOption value={i + 1}>{i + 1}</SelectOption>
        ))}
      </Select>
      <p>
        {currentPage} {t("of", "of")}{" "}
        {maxItemsNum > 0 ? Math.ceil(maxItemsNum / itemsPerPage) : "Unkown"}
      </p>
      <div className="flex gap-2 items-center">
        <ChevronLeftIcon
          onClick={() => {
            onPrevClick && onPrevClick(currentPage);
          }}
          className="text-gray-500 bg-white text-xl cursor-pointer"
        />
        <ChevronRightIcon
          onClick={() => {
            onPrevClick && onPrevClick(currentPage);
          }}
          className="text-gray-500 bg-white text-xl cursor-pointer"
        />
      </div>
    </div>
  );
};
