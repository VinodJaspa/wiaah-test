import { t } from "i18next";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { ShopProductFilter } from "ui";
import { categories } from "ui/placeholder/categories";

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <div
      className={`${
        !isOpen
          ? "hidden"
          : "noScroll fixed h-screen overflow-y-scroll pb-4 pl-3"
      } filter-section inset-0 z-50  w-full bg-white pr-3 `}
    >
      <div className="flex h-20 w-full items-center justify-start md:hidden">
        <BsArrowLeft
          onClick={() => {
            onClose();
          }}
          className="back-button ml-2  h-full text-xl"
        />
        <span className="ml-8">{t("Filter", "Filter")}</span>
      </div>
      <div className="flex w-full justify-center gap-4">
        <ShopProductFilter
          open={true}
          shipping={["Click and Collect", "Free", "International"]}
          colors={["#920", "#059", "#229"]}
          size={["S", "M", "L", "XL", "XXL", "XXXL"]}
          stockStatus
          rating
          countryFilter
          cityFilter
          categories={categories}
          priceRange={{ max: 1000, min: 10 }}
        />
      </div>
    </div>
  );
};
