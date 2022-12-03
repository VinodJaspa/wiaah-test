import React from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";
import { HiOutlineViewList, HiOutlineViewGrid } from "react-icons/hi";
import { FilterModal } from "ui";

export interface ShopFilterProps {
  onlyMobile?: boolean;
}

export const ShopFilter: React.FC<ShopFilterProps> = ({
  onlyMobile = true,
}) => {
  const { t } = useTranslation();
  const [isGrid, setGrid] = React.useState(false);
  const [filterVisibleOnMobile, setFilterVisibleOnMobile] =
    React.useState(false);

  return (
    <div className="flex justify-end">
      <FilterModal
        isOpen={filterVisibleOnMobile}
        onClose={() => setFilterVisibleOnMobile(false)}
      />
      <div
        onClick={() => {
          setFilterVisibleOnMobile(true);
        }}
        className={`filter-button mr-2 flex items-center justify-between rounded-lg border p-2 text-xs ${
          onlyMobile && "md:hidden"
        }`}
      >
        <samp>{t("Filter", "Filter")}</samp>
        <FaChevronDown className="ml-2" />
      </div>
      <HiOutlineViewList
        onClick={() => {
          setGrid(false);
        }}
        className={`${
          isGrid ? "" : "bg-gray-200"
        } list-button mr-2 inline-block h-9 w-9 rounded-lg border p-2 text-lg md:hidden`}
      />
      <HiOutlineViewGrid
        onClick={() => {
          setGrid(true);
        }}
        className={`${
          isGrid ? "bg-gray-200" : ""
        } grid-button inline-block h-9 w-9 rounded-lg border p-2 text-lg md:hidden`}
      />
    </div>
  );
};
