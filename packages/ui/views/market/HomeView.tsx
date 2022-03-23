import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { Card, Divider } from "../../components";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { t } from "i18next";
import { Collaboration } from "../../components/blocks";

export const HomeView: React.FC = () => {
  return (
    <>
      <div className="block w-full space-y-6 p-6">
        <div className="grid w-full grid-cols-1 gap-4 rounded-lg bg-green-400 p-4 md:grid-cols-3 lg:grid-cols-6">
          <label htmlFor="Category" className="relative flex">
            <FaChevronDown className="pointer-events-none absolute inset-y-1/3 right-3 h-4 w-4 text-green-400" />
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

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(12)].map((_, i: number) => (
            <Card id={String(i)} key={i} name="Shop Name" imgUrl="/shop.jpeg" />
          ))}
        </div>

        <div className="flex w-full justify-center">
          <ul className="inline-flex items-center space-x-4 text-white">
            <li className="flex h-10 w-10 cursor-pointer items-center rounded-full bg-green-400 p-3">
              <FaAngleDoubleLeft className="h-5 w-5" />
            </li>
            <li className="flex h-10 w-10 cursor-pointer items-center rounded-full bg-green-400 p-3">
              <FaAngleLeft className="h-5 w-5" />
            </li>
            <li className="flex h-10 w-10 cursor-pointer  items-center justify-center rounded-full bg-green-400 p-3">
              1
            </li>
            <li className="flex h-10 w-10 cursor-pointer items-center rounded-full bg-green-400 p-3">
              <FaAngleRight className="h-5 w-5" />
            </li>
            <li className="flex h-10 w-10 cursor-pointer items-center rounded-full bg-green-400 p-3">
              <FaAngleDoubleRight className="h-5 w-5" />
            </li>
          </ul>
        </div>

        <Divider />

        <Collaboration />
      </div>
    </>
  );
};
