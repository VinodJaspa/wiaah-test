import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Card, ImageCard, Divider } from "../../components";
import { Product } from "ui/components/blocks/products/product";
import { ProductFilter } from "ui/components/blocks/products/productFilter";
import { BreadCrumb } from "ui/components/blocks/BreadCrumb";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import { t } from "i18next";

export const SearchView: React.FC = () => {
  let [isGrid, setGrid] = useState(false);
  let [filterVisibleOnMobile, setFilterVisibleOnMobile] = useState(false);

  const breadcrumb = [
    {
      text: t("Clothing", "Clothing"),
      url: "/category/clothing",
    },
    {
      text: t("Women_s", "Women's"),
      url: "/category/clothing/women",
    },
    {
      text: t("Dresses", "Dresses"),
      url: "/category/clothing/women/dresses",
    },
  ];

  return (
    <>
      <div className="block w-full space-y-6 p-5">
        <div className="">
          <BreadCrumb breadcrumb={breadcrumb} />
        </div>
        <div className="flex justify-end">
          <div
            onClick={() => {
              setFilterVisibleOnMobile(true);
            }}
            className="filter-button mr-2 flex items-center justify-between rounded-lg border p-2 text-xs md:hidden"
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
        <div className="flex items-start">
          <div
            className={`${
              !filterVisibleOnMobile
                ? "hidden"
                : "fixed h-screen overflow-y-scroll pb-4 pl-3"
            } filter-section inset-0 z-10  bg-white pr-3 md:block md:w-2/6 lg:block lg:w-1/5`}
          >
            <div className="flex h-20 w-full items-center justify-start md:hidden">
              <BsArrowLeft
                onClick={() => {
                  setFilterVisibleOnMobile(false);
                }}
                className="back-button ml-2  h-full text-xl"
              />
              <span className="ml-8">{t("Filter", "Filter")}</span>
            </div>
            <ProductFilter
              priceRange={{ min: 0, max: 1000 }}
              brands={[
                { label: "Merishop", value: "merishop" },
                { label: "Rehanseller", value: "rehanseller" },
                { label: "Wihaa", value: "wihaa" },
                { label: "Hussaindesigner01", value: "hussaindesigner01" },
              ]}
            ></ProductFilter>
          </div>
          <div className="w-full md:w-4/6 lg:w-4/5">
            <div
              className={`${
                isGrid ? "grid-cols-2" : "grid-cols-1"
              } product-list grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3`}
            >
              {[...Array(12)].map((_, i: number) => (
                <Product
                  name="Camera Digital with extra lenses"
                  imgUrl="/shop-2.jpeg"
                  price={518.68}
                  rating={4}
                  cashback={10}
                  off={10}
                  oldPrice={600}
                  key={i}
                ></Product>
              ))}
            </div>
            <div className="flex w-full justify-center">
              <ul className="inline-flex items-center space-x-4 p-20 text-white">
                <li className="flex h-10 w-10 cursor-pointer items-center rounded-full bg-green-400 p-3">
                  <FaAngleDoubleLeft className="h-5 w-5" />
                </li>
                <li className="flex h-10 w-10 cursor-pointer items-center rounded-full bg-green-400 p-3">
                  <FaAngleLeft className="h-5 w-5" />
                </li>
                <li className="flex h-10 w-10 cursor-pointer items-center items-center justify-center rounded-full bg-green-400 p-3">
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
          </div>
        </div>

        <Divider />

        <div className="flex w-full justify-center">
          <p className="text-2xl font-bold uppercase">
            {t("Collaboration", "Collaboration")}
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(4)].map((_, i: number) => (
            <ImageCard key={i} imgUrl="/shop-2.jpeg" />
          ))}
        </div>
      </div>
    </>
  );
};
