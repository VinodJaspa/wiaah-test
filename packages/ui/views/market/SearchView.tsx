import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  Divider,
  ShopProductFilter,
  ProductCard,
  Collaboration,
  useGetProductsQuery,
  usePaginationControls,
  Pagination,
  useGetProductCategories,
} from "@UI";
import { BreadCrumb } from "@UI";
import { BsArrowLeft } from "react-icons/bs";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDimensions, useResponsive } from "hooks";
import { Category, ProductCategoryStatus } from "@features/API";

export const SearchView: React.FC = () => {
  const { t } = useTranslation();
  let [isGrid, setGrid] = useState(false);
  let [filterVisibleOnMobile, setFilterVisibleOnMobile] = useState(false);
  const router = useRouter();
  const breadCrumbLinks = [{ text: "wiaah", url: "/" }].concat(
    [
      ...(Array.isArray(router.query.categories)
        ? router.query.categories
        : router.query.categories
          ? [router.query.categories]
          : []),
    ].map((cate, i) => ({
      text: cate,
      url: `/${cate}`,
    })),
  );
  const [filters, setFilters] = React.useState<Record<string, any>>({});
  const { controls, pagination } = usePaginationControls();
  const {
    data: res,
    isLoading,
    isError,
  } = useGetProductsQuery({ ...filters, pagination });
  const { data: _categories } = useGetProductCategories();
  const categories = placeholderCategories;

  const { isTablet, isMobile } = useResponsive();

  const minGap = isTablet ? 0 : 48;

  const leftPanelRef = React.useRef<HTMLDivElement>(null);

  const { width } = useDimensions(leftPanelRef);

  const leftPanelwidth = width || null;

  return (
    <>
      <div className=" w-full py-4 relative">
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
            className={`${isGrid ? "" : "bg-gray-200"
              } list-button mr-2 inline-block h-9 w-9 rounded-lg border p-2 text-lg md:hidden`}
          />
          <HiOutlineViewGrid
            onClick={() => {
              setGrid(true);
            }}
            className={`${isGrid ? "bg-gray-200" : ""
              } grid-button inline-block h-9 w-9 rounded-lg border p-2 text-lg md:hidden`}
          />
        </div>
        <div className="flex items-start justify-center">
          <div
            className={`${!filterVisibleOnMobile
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
            <div className="h-full w-full flex gap-8">
              <div className="ml-12" ref={leftPanelRef}>
                {!isMobile && (
                  <div className="flex flex-col gap-2">
                    <div className="px-4">
                      <BreadCrumb links={breadCrumbLinks} />
                    </div>

                    <ShopProductFilter
                      open={true}
                      priceRange={{ max: 1000, min: 10 }}
                      shipping={["Click and Collect", "Free", "International"]}
                      colors={["#920", "#059", "#229"]}
                      size={["S", "M", "L", "XL", "XXL", "XXXL"]}
                      stockStatus={true}
                      rating={true}
                      brands={["nike", "or", "zake"]}
                      categories={categories || []}
                      countryFilter={true}
                      cityFilter={true}
                    />
                  </div>
                )}
              </div>
              <div
                style={{
                  width: `calc(100% - (${leftPanelwidth || 0}px + 3rem))`,
                  paddingRight: minGap,
                  paddingLeft: minGap,
                }}
                className={`h-full`}
              >
                {/* shop items */}
                {res
                  ? res.data.getProducts.map((product, i) => (
                    <ProductCard
                      {...product}
                      buttonText="Add to Cart"
                      key={i}
                    />
                  ))
                  : ["", ""]}
                <Pagination controls={controls} />
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <Collaboration />
      </div>
    </>
  );
};

const placeholderCategories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    parantId: "0",
    sales: 1500,
    sortOrder: 1,
    status: ProductCategoryStatus.Active, // Assuming "ACTIVE" is a valid status
  },
  {
    id: "2",
    name: "Clothing",
    parantId: "0",
    sales: 800,
    sortOrder: 2,
    status: ProductCategoryStatus.Active, // Assuming "ACTIVE" is a valid status
  },
  {
    id: "3",
    name: "Home Appliances",
    parantId: "0",
    sales: 1200,
    sortOrder: 3,
    status: ProductCategoryStatus.InActive, // Assuming "ACTIVE" is a valid status
  },
  {
    id: "4",
    name: "Toys & Games",
    parantId: "0",
    sales: 500,
    sortOrder: 4,
    status: ProductCategoryStatus.Active, // Assuming "ACTIVE" is a valid status
  },
  {
    id: "5",
    name: "Books",
    parantId: "0",
    sales: 700,
    sortOrder: 5,
    status: ProductCategoryStatus.InActive, // Assuming "ACTIVE" is a valid status
  },
];
