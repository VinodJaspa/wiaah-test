import { Rate } from "antd";
import { t } from "i18next";
import React from "react";
import { Container, Pagination, Spacer } from "ui";
import { GridContainerPager } from "ui/components/blocks/GridContainerPager";
import { Reviews } from "ui/components/blocks/Reviews";
import { ShopProductFilter } from "ui/components/blocks/products/ShopProductFilter";
import { ProductCard } from "ui/components/blocks/ProductCard";
import { ProductDetails } from "ui/types/products/ProductDetail.interface";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import { categories } from "ui/placeholder/categories";
import { FaChevronDown } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { Shop, ShopProfile } from "./ShopProfile";
import { BuyerCommentProps } from "ui/components/blocks/BuyerComment";
import { useRouter } from "next/router";

interface ShopViewProps {
  shop: Shop;
  products: ProductDetails[];
  reviews: BuyerCommentProps[];
}

export const ShopView: React.FC<ShopViewProps> = ({
  shop,
  products,
  reviews,
}) => {
  const router = useRouter();
  const [isGrid, setGrid] = React.useState(false);
  const [filterVisibleOnMobile, setFilterVisibleOnMobile] =
    React.useState(false);

  return (
    <section className="flex flex-col items-center justify-center">
      {/* shop info */}
      <ShopProfile shop={shop} />
      <Spacer />
      <Container>
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
                colors={["#920", "#059", "#229"]}
                size={["S", "M", "L", "XL", "XXL", "XXXL"]}
                stockStatus={true}
                rating={true}
                countryFilter={true}
                cityFilter={true}
                categories={categories}
                priceRange={{ max: 1000, min: 10 }}
              />
            </div>
          </div>
          <div className="flex w-full justify-center gap-4">
            <div className="hidden md:block">
              <ShopProductFilter
                open={true}
                shipping={["Click and Collect", "Free", "International"]}
                colors={["#920", "#059", "#229"]}
                size={["S", "M", "L", "XL", "XXL", "XXXL"]}
                stockStatus={true}
                rating={true}
                countryFilter={true}
                cityFilter={true}
                categories={categories}
                priceRange={{ max: 1000, min: 10 }}
              />
            </div>
            <div className="flex w-full flex-col items-center">
              <GridContainerPager componentsLimit={20}>
                {/* shop items */}
                {products.map((product, i) => (
                  <ProductCard
                    onButtonClick={(id) => router.push(`/products/${id}`)}
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

              <Spacer />
              <Spacer />
              <Reviews reviews={reviews} />
            </div>
          </div>
        </div>
      </Container>
      <Spacer />
    </section>
  );
};
