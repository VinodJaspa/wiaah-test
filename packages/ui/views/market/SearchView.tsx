import {
  Category,
  ProductCategoryStatus
} from "@features/API";
import {
  BreadCrumb,
  Divider,
  ProductOutput,
  ProductSearchViewCard,
  ShopProductFilter,
  useGetProductCategories,
  usePaginationControls
} from "@UI";
import Pagination from "@UI/components/shadcn-components/Pagination/Pagination";
import { useDimensions, useResponsive } from "hooks";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsArrowLeft } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";

export const SearchView: React.FC = () => {
  const { t } = useTranslation();
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
  // These are the sorting options available in the dropdown.
  const sortOptions = [
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Newest Arrivals", value: "date-desc" },
  ];

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
  // State to manage the open/closed state of the sort dropdown.
  const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);
  // State to hold the currently selected sort option.
  const [selectedSort, setSelectedSort] = useState("date-desc");
  const leftPanelwidth = width || null;
  // const sortedProducts = useMemo(() => {
  //   let sortedRes = [...res];
  //   if (selectedSort === "price-asc") {
  //     sortedRes.sort((a, b) => a.price - b.price);
  //   } else if (selectedSort === "price-desc") {
  //     sortedRes.sort((a, b) => b.price - a.price);
  //   } else if (selectedSort === "date-desc") {
  //     sortedRes.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
  //   }
  //   return sortedRes;
  // }, [res, selectedSort]);
  return (
    <div className=" w-full  relative h-full ">
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
                  {/* Breadcrumb section from image is already here */}

                  <div className="pb-4">
                    <button className="clear-filters-button w-full py-2 bg-gray-100 rounded-md">
                      Clear Filters
                    </button>
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
              <div className="px-4 space-y-10">
                <BreadCrumb links={breadCrumbLinks} />
              </div>
              <div className="px-4 flex justify-between items-center mb-4 pt-4">

                <div className="flex flex-col">
                  <h1 className="text-medium font-bold">Search Results</h1>
                  <span className="text-sm text-gray-600 pt-4">
                    Showing 1-24 of 120 results
                  </span>
                </div>
                <div className="relative">
                  <button
                    className="px-4 py-2 bg-gray-100 rounded-md text-sm flex items-center"
                    onClick={() => setSortDropdownOpen(!isSortDropdownOpen)}
                  >
                    {sortOptions.find((opt) => opt.value === selectedSort)?.label}
                    <FaChevronDown className={`ml-2 transition-transform duration-300 ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isSortDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 ">
                      {sortOptions.map((option) => (
                        <div
                          key={option.value}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => {
                            setSelectedSort(option.value);
                            setSortDropdownOpen(false);
                          }}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* shop items */}
              <div className="h-full w-fit grid  grid-cols-2 md:grid-cols-4 md:gap-4 gap-2">
                {res
                  ? res.map((product, i) => (

                    <ProductSearchViewCard
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
              <Pagination />
            </div>
          </div>
        </div>
      </div>
      <Divider />
      {/* <Collaboration /> */}
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
        src: "https://picsum.photos/id/1015/600/600",
        type: "image",
      },
      {
        src: "https://picsum.photos/id/1015/600/600",
        type: "video",
      },
    ],
    price: 49.99,
    rate: 4.2,
    reviews: 34,
    title: "Vintage Leather Satchel",
    vat: 10.0,
  },
  {
    attributes: [
      {
        name: "Color",
        values: ["Black", "Silver"],
      },
      {
        name: "Material",
        values: ["Metal", "Plastic"],
      },
    ],
    brand: "Brand B",
    cashback: {
      amount: 5,
      type: "percent",
      units: "USD",
    },
    categoryId: "category-002",
    description: "A sleek, minimalist electronic gadget.",
    discount: {
      amount: 25.0,
      units: "USD",
    },
    id: "product-005",
    presentations: [
      {
        src: "https://picsum.photos/id/1016/600/600",
        type: "image",
      },
      {
        src: "https://picsum.photos/id/1016/600/600",
        type: "video",
      },
    ],
    price: 199.99,
    rate: 4.8,
    reviews: 87,
    title: "Urban Smartwatch",
    vat: 15.0,
  },
  {
    attributes: [
      {
        name: "Color",
        values: ["White", "Yellow", "Blue"],
      },
      {
        name: "Size",
        values: ["One Size"],
      },
    ],
    brand: "Brand C",
    cashback: {
      amount: 0,
      type: "percent",
      units: "USD",
    },
    categoryId: "category-003",
    description: "A comfortable and lightweight travel pillow.",
    discount: {
      amount: 0,
      units: "USD",
    },
    id: "product-008",
    presentations: [
      {
        src: "https://picsum.photos/id/1025/600/600",
        type: "image",
      },
      {
        src: "https://picsum.photos/id/1025/600/600",
        type: "video",
      },
    ],
    price: 29.50,
    rate: 3.9,
    reviews: 12,
    title: "Ergonomic Travel Pillow",
    vat: 8.0,
  },
  {
    attributes: [
      {
        name: "Color",
        values: ["Brown", "Beige", "Black"],
      },
      {
        name: "Material",
        values: ["Wood", "Plastic"],
      },
    ],
    brand: "Brand D",
    cashback: {
      amount: 15,
      type: "percent",
      units: "USD",
    },
    categoryId: "category-004",
    description: "A beautifully crafted wooden home decor item.",
    discount: {
      amount: 10.0,
      units: "USD",
    },
    id: "product-009",
    presentations: [
      {
        src: "https://picsum.photos/id/1031/600/600",
        type: "image",
      },
      {
        src: "https://picsum.photos/id/1031/600/600",
        type: "video",
      },
    ],
    price: 85.0,
    rate: 4.5,
    reviews: 45,
    title: "Hand-Carved Wooden Bowl",
    vat: 12.0,
  },
  {
    attributes: [
      {
        name: "Color",
        values: ["Green", "Gray"],
      },
      {
        name: "Size",
        values: ["Small", "Medium"],
      },
    ],
    brand: "Brand E",
    cashback: {
      amount: 20,
      type: "percent",
      units: "USD",
    },
    categoryId: "category-005",
    description: "A small, potted indoor plant.",
    discount: {
      amount: 2.0,
      units: "USD",
    },
    id: "product-0011",
    presentations: [
      {
        src: "https://picsum.photos/id/1035/600/600",
        type: "image",
      },
      {
        src: "https://picsum.photos/id/1035/600/600",
        type: "video",
      },
    ],
    price: 15.0,
    rate: 4.1,
    reviews: 23,
    title: "Miniature Cactus Garden",
    vat: 5.0,
  },
  {
    attributes: [
      {
        name: "Color",
        values: ["Red", "Orange", "Blue"],
      },
      {
        name: "Size",
        values: ["One Size"],
      },
    ],
    brand: "Brand F",
    cashback: {
      amount: 0,
      type: "percent",
      units: "USD",
    },
    categoryId: "category-006",
    description: "A vibrant and fun toy for children.",
    discount: {
      amount: 0,
      units: "USD",
    },
    id: "product-001",
    presentations: [
      {
        src: "https://picsum.photos/id/1038/600/600",
        type: "image",
      },
      {
        src: "https://picsum.photos/id/1038/600/600",
        type: "video",
      },
    ],
    price: 12.99,
    rate: 5.0,
    reviews: 98,
    title: "Colorful Building Blocks",
    vat: 10.0,
  },
  {
    attributes: [
      {
        name: "Color",
        values: ["Black", "White", "Red"],
      },
      {
        name: "Size",
        values: ["Small", "Medium", "Large"],
      },
    ],
    brand: "Brand G",
    cashback: {
      amount: 8,
      type: "percent",
      units: "USD",
    },
    categoryId: "category-007",
    description: "Classic headphones with modern technology.",
    discount: {
      amount: 15.0,
      units: "USD",
    },
    id: "product-0012",
    presentations: [
      {
        src: "https://picsum.photos/id/1041/600/600",
        type: "image",
      },
      {
        src: "https://picsum.photos/id/1041/600/600",
        type: "video",
      },
    ],
    price: 79.99,
    rate: 4.6,
    reviews: 67,
    title: "Over-Ear Wireless Headphones",
    vat: 18.0,
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
        src: "https://picsum.photos/id/1054/600/600",
        type: "image",
      },
      {
        src: "https://picsum.photos/id/1054/600/600",
        type: "video",
      },
    ],
    price: 120.0,
    rate: 4.8,
    reviews: 56,
    title: "Elegant Leather Loafers",
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
        src: "https://picsum.photos/id/1059/600/600",
        type: "image",
      },
    ],
    price: 19.99,
    rate: 3.9,
    reviews: 15,
    title: "Foldable Picnic Blanket",
    vat: 5.0,
  },
];