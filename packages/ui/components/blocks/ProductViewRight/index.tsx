import React from "react";
import { FlexStack, WishListIcon, Rate, Select, SelectOption } from "ui";
import { useMutateShoppingCart, Button } from "ui";
import { useCartSummary, useProductDescTabs } from "ui/Hooks";
import { CartSummaryItem } from "types";
import { useTranslation } from "react-i18next";

export interface ProductProps {
  id: string;
  name?: string;
  price: number;
  oldPrice?: number;
  imgUrl?: string;
  rating?: number;
  off?: number;
  reviews?: number;
  category?: string;
  saved?: boolean;
  available?: number;
  shippedToYourCountry?: boolean;
  cashBack?: number;
  location?: string;
}

export const ProductViewRight: React.FC<ProductProps> = ({
  name = "",
  price,
  oldPrice,
  rating = 0,
  shippedToYourCountry = true,
  available,
  off = "",
  category = "",
  reviews = 0,
  imgUrl,
  id,
}) => {
  const { t } = useTranslation();
  const { OpenShoppingCart } = useMutateShoppingCart();
  const { AddNewItem } = useCartSummary();
  const { ChangeTab } = useProductDescTabs();
  function handleNewItem(item: CartSummaryItem) {
    AddNewItem({
      item,
      shop: {
        id,
        imageUrl: "/shop.jpeg",
        name: "wiaah",
      },
    });
    OpenShoppingCart();
  }
  function handleAddToWishList() {
    // add to wishList
  }

  function sendToReviews() {}
  return (
    <div className="flex h-full flex-col items-start justify-between">
      <div className="flex w-full flex-col">
        <samp className="green-text">{category}</samp>
        <h1 className="m-0 text-2xl font-bold text-gray-800 ">{name}</h1>
        <div className="flex items-center">
          <a
            href="#reviews"
            onClick={() => ChangeTab("reviews")}
            className="inline-flex cursor-pointer items-center"
          >
            <Rate allowHalf rating={rating} />
          </a>
          <div className="mx-3 h-5 w-px bg-gray-300"></div>
          <span className="text-gray-500">
            {reviews} {t("Reviews", "Reviews")}
          </span>
        </div>
        <div className="mt-2 flex items-center font-bold">
          <span className="product-price text-3xl">${price}</span>
          {!oldPrice ? (
            ""
          ) : (
            <span className="product-old-price ml-5 text-2xl text-slate-400 line-through">
              ${oldPrice}
            </span>
          )}
        </div>
        <div className="my-2 inline-block w-fit rounded-md bg-red-400 px-4 py-1 font-bold text-white">
          <span>{off}% </span>
          <span>{t("OFF", "OFF")}</span>
        </div>
        <div className="mb-2 text-lg">
          <div>
            <span className="font-bold">
              {available
                ? t("Available", "Available") + ":" + available
                : t("Not_Available", "Not Available")}{" "}
            </span>
            <span className="text-gray-500">{t("In_Stock", "In Stock")} </span>
          </div>
          <div className="text-red-500">
            {shippedToYourCountry
              ? t(
                  "Shipping_available_in_your_country",
                  "Shipping available in your country"
                )
              : ""}
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="mb-2">
          <div className="mb-1 font-light">{t("Color", "Color")}</div>
          <div className="flex">
            <div className="mr-3 h-8 w-8 rounded-sm border-2 border-black bg-red-500"></div>
            <div className="green-background mr-3 h-8 w-8 rounded-sm "></div>
            <div className="mr-3 h-8 w-8 rounded-sm bg-blue-500 "></div>
          </div>
        </div>
        <div className="mb-4 w-full">
          <div className="mb-1 font-light">{t("Size", "Size")}</div>
          <Select
            id="cityselect"
            className="w-full"
            placeholder={t("Size", "Size")}
          >
            <SelectOption value="small">{t("Small", "Small")}</SelectOption>
          </Select>
        </div>
        <FlexStack fullWidth={true} horizontalSpacingInRem={0.5}>
          <Button
            onClick={() =>
              handleNewItem({
                id,
                name,
                price,
                qty: 1,
                imageUrl: imgUrl || "",
                type: "product",
              })
            }
          >
            {t("Add_To_Cart", "Add To Cart")}
          </Button>
          <WishListIcon onClick={handleAddToWishList} />
        </FlexStack>
      </div>
    </div>
  );
};
