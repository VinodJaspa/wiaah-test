import { Rate } from "antd";
import { t } from "i18next";
import React from "react";
import { Button, Container, Spacer } from "ui";
import { ShopProductFilter } from "ui/components/blocks/products/ShopProductFilter";
import { ProductCard } from "ui/components/blocks/ProductCard";
import { ProductDetails } from "ui/types/products/ProductDetail.interface";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import { FaChevronDown } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";

interface ShopViewProps {
  shop: Shop;
  products: ProductDetails[];
}

interface Shop {
  shopName: string;
  shopDetails: string;
  shopRating: number;
  shopSince: string;
  shopThumbnailUrl: string;
  shopLocation: string;
}

export const ShopView: React.FC<ShopViewProps> = ({
  shop: {
    shopDetails,
    shopLocation,
    shopName,
    shopRating,
    shopSince,
    shopThumbnailUrl,
  },
  products,
}) => {
  const [isGrid, setGrid] = React.useState(false);
  const [filterVisibleOnMobile, setFilterVisibleOnMobile] =
    React.useState(false);

  return (
    <section className="flex flex-col items-center justify-center">
      {/* shop info */}
      <div className="flex h-fit w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#32D298] to-[#5FE9D2]  py-8 md:flex-row md:items-stretch ">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex h-96 w-fit flex-col items-center justify-end overflow-hidden rounded-md bg-white py-4 px-12">
            <div className="absolute top-0 left-0 h-1/4 w-full bg-black "></div>
            {/* shop profile */}
            <div className="relative flex h-3/4 w-full flex-col items-center justify-between">
              <div className="absolute top-0 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-white ">
                {/* shop thumbnail */}
                <img
                  className="h-full w-full object-cover"
                  src={shopThumbnailUrl}
                  alt={shopName}
                />
              </div>
              <Spacer spaceInRem={5} />
              <div className="flex w-full flex-col items-center gap-2">
                {/* shop name, rating and creatation date */}
                <div className="text-lg font-bold">
                  {/* shop name */}
                  {shopName}
                </div>
                <div>
                  {/* shop ratting */}
                  <Rate
                    disabled
                    allowHalf
                    value={shopRating}
                    className="text-orange-500"
                  />
                </div>
                <div>
                  {/* shop creation date */}
                  {shopSince}
                </div>
              </div>
              <Spacer spaceInRem={1} />
              <div className="flex gap-4">
                {/* buttons */}
                <div>
                  {/* message button */}
                  <Button
                    hexBackgroundColor="#5FE9D4"
                    text={t("Message", "Message")}
                  />
                </div>
                <div>
                  {/* follow button */}
                  <Button
                    hexBackgroundColor="#5FE9D4"
                    text={t("Follow", "Follow")}
                  />
                </div>
              </div>
              <Spacer />
              <div className="flex w-full justify-end">
                {/* shop location */}
                {shopLocation}
              </div>
            </div>
          </div>
          <div className="flex h-auto w-full flex-col gap-4 md:w-96 lg:w-[30rem]">
            {/* shop destails */}
            <div className="flex h-16 items-center justify-center rounded-md bg-white p-4 text-lg font-bold">
              {/* shop name */}
              {shopName}
            </div>
            <div className="h-full bg-white p-4">
              {/* shop Desc */}
              {shopDetails}
            </div>
          </div>
        </div>
      </div>
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
                shipping={["Click and Collect", "Free", "International"]}
                colors={["#920", "#059", "#229"]}
                size={["S", "M", "L", "XL", "XXL", "XXXL"]}
                stockStatus={true}
                rating={true}
                countryFilter={true}
                cityFilter={true}
                categories={["men", "women", "childrens"]}
                priceRange={{ max: 1000, min: 10 }}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
        {/* <div className="flex w-full justify-center gap-4">
          <div>
            {/* shop filter */}
        {/* <h1>Filter</h1>
            <ShopProductFilter
              open={true}
              priceRange={{ max: 1000, min: 10 }}
              shipping={["Click and Collect", "Free", "International"]}
              colors={["#920", "#059", "#229"]}
              size={["S", "M", "L", "XL", "XXL", "XXXL"]}
              stockStatus={true}
              rating={true}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* shop items */}
        {/* {products.map((product, i) => (
              <ProductCard
                buttonText="Add to Cart"
                id={product.id}
                name={product.name}
                imageUrl={product.imgUrl}
                price={product.price}
                rating={product.rating}
                cashback={product.cashBack}
                discount={product.off}
                oldPrice={product.oldPrice}
                key={i}
              />
            ))}
          </div>
        </div> */}
      </Container>
      <Spacer />
    </section>
  );
};
