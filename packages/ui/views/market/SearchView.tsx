import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  Card,
  ImageCard,
  Divider,
  ShopProductFilter,
  ProductCard,
} from "../../components";
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
import { products } from "../../placeholder/products";

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
        <div className="flex items-start justify-center">
          <div
            className={`${
              !filterVisibleOnMobile
                ? "hidden"
                : "fixed h-screen overflow-y-scroll pb-4 pl-3"
            } filter-section inset-0 z-50  w-full bg-white pr-3 `}
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
            <div className="flex w-full justify-center gap-4">
              <ShopProductFilter
                open={true}
                shipping={["Click and Collect", "Free", "International"]}
                locations={["USA", "FR", "UK"]}
                colors={["#920", "#059", "#229"]}
                rating={true}
              />
            </div>
          </div>
          <div className="flex w-full justify-center gap-4">
            <div className="hidden md:block">
              <ShopProductFilter
                open={true}
                priceRange={{ max: 1000, min: 10 }}
                shipping={["Click and Collect", "Free", "International"]}
                colors={["#920", "#059", "#229"]}
                size={["S", "M", "L", "XL", "XXL", "XXXL"]}
                stockStatus={true}
                rating={true}
                brands={["nike", "or", "zake"]}
                categories={["men", "women", "childrens"]}
                countryFilter={true}
                cityFilter={true}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* shop items */}
              {products.map((product, i) => (
                <ProductCard
                  buttonText="Add to Cart"
                  id={product.id || ""}
                  name={product.name || ""}
                  imageUrl={product.imgUrl || ""}
                  price={product.price}
                  rating={product.rating}
                  cashback={product.cashBack}
                  discount={product.off}
                  oldPrice={product.oldPrice}
                  key={i}
                />
              ))}
            </div>
          </div>
        </div>
        {/* <div className="flex w-full justify-center">
            <ul className="inline-flex items-center space-x-4 p-20 text-white">
              <li className="flex h-10 w-10 cursor-pointer items-center rounded-full bg-green-400 p-3">
                <FaAngleDoubleLeft className="h-5 w-5" />
              </li>
              <li className="flex h-10 w-10 cursor-pointer items-center rounded-full bg-green-400 p-3">
                <FaAngleLeft className="h-5 w-5" />
              </li>
              <li className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-green-400 p-3">
                1
              </li>
              <li className="flex h-10 w-10 cursor-pointer items-center rounded-full bg-green-400 p-3">
                <FaAngleRight className="h-5 w-5" />
              </li>
              <li className="flex h-10 w-10 cursor-pointer items-center rounded-full bg-green-400 p-3">
                <FaAngleDoubleRight className="h-5 w-5" />
              </li>
            </ul>
          </div> */}

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
