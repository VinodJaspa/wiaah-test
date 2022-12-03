import React from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  Collaboration,
  Divider,
  useSearchFilters,
  PaginationWrapper,
  ShopsAndServicesRecommendationsList,
} from "ui";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { usePagination } from "hooks";

export const HomeView: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="block w-full space-y-6 p-4">
        <div className="grid w-full grid-cols-1 gap-4 rounded-lg bg-primary p-4 md:grid-cols-3 lg:grid-cols-6">
          <label htmlFor="Category" className="relative flex">
            <FaChevronDown className="pointer-events-none absolute inset-y-1/3 right-3 h-4 w-4 text-primary" />
            <select
              className="w-full appearance-none rounded px-2.5 py-2 focus:outline-none"
              placeholder={t("Category", "Category")}
            >
              <option>{t("Type_of_Store", "Type of Store")}</option>
              <option>Store 1</option>
              <option>Store 2</option>
              <option>Store 3</option>
            </select>
          </label>
          <label htmlFor="Category" className="relative flex">
            <FaChevronDown className="pointer-events-none absolute inset-y-1/3 right-3 h-4 w-4 text-green-400" />
            <select
              className="w-full appearance-none rounded px-2.5 py-2 focus:outline-none"
              placeholder={t("Category", "Category")}
            >
              <option>{t("Type_of_Vendor", "Type of Vendor")}</option>
              <option>Vendor 1</option>
              <option>Vendor 2</option>
              <option>Vendor 3</option>
            </select>
          </label>
          <label htmlFor="Category" className="relative flex">
            <FaChevronDown className="pointer-events-none absolute inset-y-1/3 right-3 h-4 w-4 text-green-400" />
            <select
              className="w-full appearance-none rounded px-2.5 py-2 focus:outline-none"
              placeholder={t("Category", "Category")}
            >
              <option>{t("Gender_Type", "Gender Type")}</option>
              <option>Gender 1</option>
              <option>Gender 2</option>
              <option>Gender 3</option>
            </select>
          </label>
          <label htmlFor="Category" className="relative flex">
            <FaChevronDown className="pointer-events-none absolute inset-y-1/3 right-3 h-4 w-4 text-green-400" />
            <select
              className="w-full appearance-none rounded px-2.5 py-2 focus:outline-none"
              placeholder={t("Category", "Category")}
            >
              <option>{t("Store_Location", "Store Location")}</option>
              <option>Location 1</option>
              <option>Location 2</option>
              <option>Location 3</option>
            </select>
          </label>
          <label htmlFor="Category" className="relative flex">
            <FaChevronDown className="pointer-events-none absolute inset-y-1/3 right-3 h-4 w-4 text-green-400" />
            <select
              className="w-full appearance-none rounded px-2.5 py-2 focus:outline-none"
              placeholder={t("Category", "Category")}
            >
              <option>{t("Filter_by_City", "Filter by City")}</option>
              <option>City 1</option>
              <option>City 2</option>
              <option>City 3</option>
            </select>
          </label>
          <button className="rounded border border-white px-2.5 py-1.5 text-white">
            {t("Clear_Filters", "Clear Filters")}
          </button>
        </div>

        <ShopsAndServicesRecommendationsList />

        <Divider />

        <Collaboration />
      </div>
    </>
  );
};
