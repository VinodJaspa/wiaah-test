import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  Divider,
  ShopProductFilter,
  ProductCard,
  Collaboration,
  GridContainerPager,
} from "ui/components";
import { BreadCrumb } from "ui/components/blocks/BreadCrumb";
import { BsArrowLeft } from "react-icons/bs";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import { t } from "i18next";
import { products } from "ui/placeholder/products";
import { categories } from "ui/placeholder/categories";
import { useRouter } from "next/router";
export const SearchView: React.FC = () => {
  let [isGrid, setGrid] = useState(false);
  let [filterVisibleOnMobile, setFilterVisibleOnMobile] = useState(false);
  const router = useRouter();
  const breadCrumbLinks = [{ text: "wiaah", url: "/" }].concat(
    [...(router.query.categories || [])].map((cate, i) => ({
      text: cate,
      url: `/${cate}`,
    }))
  );
  return (
    <>
      <div className="block w-full space-y-6 p-5">
        <div className="">
          <BreadCrumb links={breadCrumbLinks} />
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
                categories={categories}
                countryFilter={true}
                cityFilter={true}
              />
            </div>
            <div className="flex w-full flex-col items-center">
              <GridContainerPager componentsLimit={40}>
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
              </GridContainerPager>
            </div>
          </div>
        </div>
        <Divider />
        <Collaboration />
      </div>
    </>
  );
};
