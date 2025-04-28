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
  ProductOutput,
} from "@UI";
import { BreadCrumb } from "@UI";
import { BsArrowLeft } from "react-icons/bs";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDimensions, useResponsive } from "hooks";
import {
  Category,
  ProductCategoryStatus,
  ProductCondition,
  ProductType,
} from "@features/API";
import { product } from "@blocks/Modals/ProductViewModal/ProductViewModal.stories";

export const SearchView: React.FC = () => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const [isGrid, setGrid] = useState(false);
  const [filterVisibleOnMobile, setFilterVisibleOnMobile] = useState(false);
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
  // const {
  //   data: _res,
  //   isLoading: _isLoading,
  //   isError: _isError,
  // } = useGetProductsQuery({ ...filters, pagination });
  const res = FAKE_PRODUCTS;
  const { data: _categories } = useGetProductCategories();
  const categories = placeholderCategories;

  const { isTablet, isMobile } = useResponsive();

  const minGap = isTablet ? 0 : 48;

  const leftPanelRef = React.useRef<HTMLDivElement>(null);

  const { width } = useDimensions(leftPanelRef);

  const leftPanelwidth = width || null;

  return (
    <div className=" w-full py-4 relative h-full">
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
      <div className="flex h-full items-start justify-center">
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
              className="back-button ml-2 h-full text-xl"
            />
            <span className="ml-8">{t("Filter", "Filter")}</span>
          </div>
          <div className="flex w-fit justify-center gap-8">
            <ShopProductFilter
              open={true}
              shipping={["Click and Collect", "Free", "International"]}
              locations={["USA", "FR", "UK"]}
              colors={["#920", "#059", "#229"]}
              rating={true}
            />
          </div>
        </div>
        <div className="flex w-fit h-full justify-center gap-4">
          <div className="h-full w-fit flex gap-8 justify-center ">
            <div className="h-full ml-12" ref={leftPanelRef}>
              {!isMobile && (
                <div className="flex flex-col gap-2 w-[300px] ">
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
              className={`h-full flex flex-col justiry-between`}
            >
              {/* shop items */}
              <div className="h-full w-fit grid  grid-cols-2 md:grid-cols-4 md:gap-4 gap-2">
                {res
                  ? res.map((product, i) => (
                    <ProductCard
                      cashback={
                        product.cashback ? product.cashback.amount : undefined
                      }
                      discount={
                        product.discount ? product.discount.amount : undefined
                      }
                      id={product.id}
                      price={product.price}
                      thumbnail={product.presentations[0].src}
                      name={product.title}
                      rate={product.rate}
                      buttonText="Add to Cart"
                      key={i}
                    />
                  ))
                  : ["", ""]}
              </div>
              <Pagination controls={controls} />
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <Collaboration />
    </div>
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
const FAKE_PRODUCTS: ProductOutput[] = [
  {
    attributes: [
      {
        name: "Color",
        values: ["Red", "Blue", "Green"],
      },
      {
        name: "Size",
        values: ["Small", "Medium", "Large"],
      },
    ],
    brand: "Brand A",
    cashback: {
      amount: 10,
      type: "percent",
      units: "USD",
    },
    categoryId: "category-001",
    description: "A high-quality product with multiple size and color options.",
    discount: {
      amount: 5.0,
      units: "USD",
    },
    id: "product-006",
    presentations: [
      {
        src: "/shop.jpeg",
        type: "image",
      },
      {
        src: "/shop.jpeg",
        type: "video",
      },
    ],
    price: 49.99,
    rate: 4.2,
    reviews: 34,
    title: "Product A",
    vat: 10.0,
  },

  {
    attributes: [
      {
        name: "Color",
        values: ["Red", "Blue", "Green"],
      },
      {
        name: "Size",
        values: ["Small", "Medium", "Large"],
      },
    ],
    brand: "Brand A",
    cashback: {
      amount: 10,
      type: "percent",
      units: "USD",
    },
    categoryId: "category-001",
    description: "A high-quality product with multiple size and color options.",
    discount: {
      amount: 5.0,
      units: "USD",
    },
    id: "product-005",
    presentations: [
      {
        src: "/shop.jpeg",
        type: "image",
      },
      {
        src: "/shop.jpeg",
        type: "video",
      },
    ],
    price: 49.99,
    rate: 4.2,
    reviews: 34,
    title: "Product A",
    vat: 10.0,
  },

  {
    attributes: [
      {
        name: "Color",
        values: ["Red", "Blue", "Green"],
      },
      {
        name: "Size",
        values: ["Small", "Medium", "Large"],
      },
    ],
    brand: "Brand A",
    cashback: {
      amount: 10,
      type: "percent",
      units: "USD",
    },
    categoryId: "category-001",
    description: "A high-quality product with multiple size and color options.",
    discount: {
      amount: 5.0,
      units: "USD",
    },
    id: "product-008",
    presentations: [
      {
        src: "/shop.jpeg",
        type: "image",
      },
      {
        src: "/shop.jpeg",
        type: "video",
      },
    ],
    price: 49.99,
    rate: 4.2,
    reviews: 34,
    title: "Product A",
    vat: 10.0,
  },

  {
    attributes: [
      {
        name: "Color",
        values: ["Red", "Blue", "Green"],
      },
      {
        name: "Size",
        values: ["Small", "Medium", "Large"],
      },
    ],
    brand: "Brand A",
    cashback: {
      amount: 10,
      type: "percent",
      units: "USD",
    },
    categoryId: "category-001",
    description: "A high-quality product with multiple size and color options.",
    discount: {
      amount: 5.0,
      units: "USD",
    },
    id: "product-009",
    presentations: [
      {
        src: "/shop.jpeg",
        type: "image",
      },
      {
        src: "/shop.jpeg",
        type: "video",
      },
    ],
    price: 49.99,
    rate: 4.2,
    reviews: 34,
    title: "Product A",
    vat: 10.0,
  },

  {
    attributes: [
      {
        name: "Color",
        values: ["Red", "Blue", "Green"],
      },
      {
        name: "Size",
        values: ["Small", "Medium", "Large"],
      },
    ],
    brand: "Brand A",
    cashback: {
      amount: 10,
      type: "percent",
      units: "USD",
    },
    categoryId: "category-001",
    description: "A high-quality product with multiple size and color options.",
    discount: {
      amount: 5.0,
      units: "USD",
    },
    id: "product-0011",
    presentations: [
      {
        src: "/shop.jpeg",
        type: "image",
      },
      {
        src: "/shop.jpeg",
        type: "video",
      },
    ],
    price: 49.99,
    rate: 4.2,
    reviews: 34,
    title: "Product A",
    vat: 10.0,
  },

  {
    attributes: [
      {
        name: "Color",
        values: ["Red", "Blue", "Green"],
      },
      {
        name: "Size",
        values: ["Small", "Medium", "Large"],
      },
    ],
    brand: "Brand A",
    cashback: {
      amount: 10,
      type: "percent",
      units: "USD",
    },
    categoryId: "category-001",
    description: "A high-quality product with multiple size and color options.",
    discount: {
      amount: 5.0,
      units: "USD",
    },
    id: "product-001",
    presentations: [
      {
        src: "/shop.jpeg",
        type: "image",
      },
      {
        src: "/shop.jpeg",
        type: "video",
      },
    ],
    price: 49.99,
    rate: 4.2,
    reviews: 34,
    title: "Product A",
    vat: 10.0,
  },
  {
    attributes: [
      {
        name: "Color",
        values: ["Red", "Blue", "Green"],
      },
      {
        name: "Size",
        values: ["Small", "Medium", "Large"],
      },
    ],
    brand: "Brand A",
    cashback: {
      amount: 10,
      type: "percent",
      units: "USD",
    },
    categoryId: "category-001",
    description: "A high-quality product with multiple size and color options.",
    discount: {
      amount: 5.0,
      units: "USD",
    },
    id: "product-0012",
    presentations: [
      {
        src: "/shop.jpeg",
        type: "image",
      },
      {
        src: "/shop.jpeg",
        type: "video",
      },
    ],
    price: 49.99,
    rate: 4.2,
    reviews: 34,
    title: "Product A",
    vat: 10.0,
  },
  {
    attributes: [
      {
        name: "Color",
        values: ["Black", "White", "Gray"],
      },
      {
        name: "Material",
        values: ["Leather", "Suede"],
      },
    ],
    brand: "Brand B",
    cashback: {
      amount: 15.0,
      type: "fixed",
      units: "USD",
    },
    categoryId: "category-002",
    description: "Stylish leather product for all occasions.",
    discount: {
      amount: 10.0,
      units: "USD",
    },
    id: "product-002",
    presentations: [
      {
        src: "/shop.jpeg",
        type: "image",
      },
      {
        src: "/shop.jpeg",
        type: "video",
      },
    ],
    price: 120.0,
    rate: 4.8,
    reviews: 56,
    title: "Product B",
    vat: 15.0,
  },
  {
    attributes: [
      {
        name: "Color",
        values: ["Yellow", "Orange", "Pink"],
      },
      {
        name: "Size",
        values: ["Medium", "Large"],
      },
    ],
    brand: "Brand C",
    cashback: {
      amount: 0,
      type: "fixed",
      units: "USD",
    },
    categoryId: "category-003",
    description: "Affordable and durable product with bright color options.",
    discount: { amount: 0, units: "USD" },
    id: "product-003",
    presentations: [
      {
        src: "/shop.jpeg",
        type: "image",
      },
    ],
    price: 19.99,
    rate: 3.9,
    reviews: 15,
    title: "Product C",
    vat: 5.0,
  },
];
