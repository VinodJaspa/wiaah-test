import { Rate } from "antd";
import { t } from "i18next";
import React from "react";
import { Button, Container, Product, ShopProductFilter, Spacer } from "ui";
import { ProductProps } from "../../components/Services/ServiceRightView";

interface ShopViewProps {
  shop: Shop;
  products: ProductProps[];
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
  return (
    <section className="flex flex-col items-center justify-center">
      {/* shop info */}
      <div className="flex h-fit w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#32D298] to-[#5FE9D2]  py-8 md:flex-row md:items-stretch ">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex h-96 w-fit flex-col items-center justify-end overflow-hidden rounded-md bg-white p-4">
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
          <div className="flex h-auto w-full flex-col gap-4 md:w-96">
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
        <div className="w-fulll flex justify-center gap-4">
          <div>
            {/* shop filter */}
            <ShopProductFilter />
            {/* <ProductFilter></ProductFilter> */}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* shop items */}
            {products.map((product, i) => (
              <Product
                name="Camera Digital with extra lenses"
                imgUrl="/shop-2.jpeg"
                price={product.price}
                rating={product.rating}
                cashback={product.cashBack}
                off={product.off}
                oldPrice={product.oldPrice}
                key={i}
              />
            ))}
          </div>
        </div>
      </Container>
      <Spacer />
    </section>
  );
};
