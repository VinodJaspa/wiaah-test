import React from "react";
import { IoHeartOutline, IoHeart, IoTrash } from "react-icons/io5";
import { usePreferedCurrency } from "state";
import { Image, PriceDisplay, Rate } from "@UI";
import { Product } from "@features/API";

export interface ProductCardProps {
  buttonText?: string;
  forceHover?: boolean | undefined;
  position?: "save" | "delete";
  full?: boolean;
  liked?: boolean;
  onLike?: (id: string) => void;
  onButtonClick?: (id: string) => void;
  onDelete?: (id: string) => void;
  id: string;
  price: number;
  thumbnail: string;
  cashback: number;
  discount: number;
  rate: number;
  name?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  price,
  thumbnail,
  position: postion = "save",
  liked,
  forceHover,
  buttonText,
  cashback,
  discount,
  rate,
  onButtonClick,
  onDelete,
  onLike,
  full,
  name,
}) => {
  const { preferedCurrency } = usePreferedCurrency();
  const [selectedColor, setSelectedColor] = React.useState<number>(0);
  const [hovered, setHovered] = React.useState<boolean>(forceHover || false);

  function handleColorSelection(i: number) {
    setSelectedColor(i);
  }

  function handleClick() {
    if (postion === "save" && onLike) {
      onLike(id);
    } else if (postion === "delete" && onDelete) {
      onDelete(id);
    }
  }

  function handleButtonClick() {
    if (onButtonClick) {
      onButtonClick(id);
    }
  }
  function handleHoverIn() {
    if (forceHover !== undefined) return;
    setHovered(true);
  }
  function handleHoverOut() {
    if (forceHover !== undefined) return;
    setHovered(false);
  }
  return (
    <div
      style={{ width: full ? "100%" : "14rem" }}
      className="flex w-56 flex-col bg-white"
    >
      <div
        style={{ height: full ? "45rem" : "18rem" }}
        data-test="image-container"
        onMouseOver={handleHoverIn}
        onMouseLeave={handleHoverOut}
        className="relative w-full "
      >
        {/* image */}
        <div className="absolute top-0 z-10 flex w-full items-center justify-between p-2">
          {cashback && (
            <div
              data-test="productCashback"
              className="bg-red-400 bg-opacity-70 px-4 text-white flex gap-2"
            >
              {/* cash ack */}
              <PriceDisplay priceObject={{ amount: cashback }} />
              Cashback
            </div>
          )}
          <span
            data-test="actionButton"
            onClick={() => handleClick()}
            className="cursor-pointer text-2xl"
          >
            {postion === "save" ? (
              liked ? (
                <div
                  data-test="productLiked"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-opacity-40 shadow-sm"
                >
                  <IoHeart className="fill-red-400" />
                </div>
              ) : (
                <div
                  data-test="productNotLiked"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-opacity-40 shadow-sm"
                >
                  <IoHeartOutline />
                </div>
              )
            ) : (
              <div
                data-test="productDelete"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-opacity-40 shadow-sm"
              >
                <IoTrash />
              </div>
            )}
          </span>
        </div>
        <div
          className={`${hovered
              ? "pointer-events-auto opacity-100 "
              : "pointer-events-none opacity-0"
            } absolute h-full w-full transition-all duration-300`}
        >
          <div className={`h-full w-full bg-black bg-opacity-20`}></div>
          <span
            data-test="productButtonText"
            onClick={() => handleButtonClick()}
            className="absolute left-1/2 bottom-12 w-8/12 -translate-x-1/2 cursor-pointer bg-white py-2 text-center text-sm text-black"
          >
            {buttonText && buttonText}
          </span>
        </div>
        <Image className="w-full h-full object-cover" src={thumbnail} />
      </div>
      <div className="p-2">
        {/* name */}
        <span data-test="productName">{name}</span>
        <div className="flex items-center justify-between">
          {/* price and colors */}
          <div className="flex items-center gap-2">
            {/* price */}
            <span
              data-test="productPriceContainer"
              className="text-lg  font-bold"
            >
              <span data-test="productCurrencySymbol">
                {preferedCurrency.currencySymbol}
              </span>
              <span data-test="productPrice">{price}</span>
            </span>{" "}
            {discount ? (
              <span
                data-test="productOldPrice"
                className="font-bold text-gray-400 line-through"
              >
                {/* old price */}
                {preferedCurrency.currencySymbol}
                {(price / ((discount - 100) / 100)).toFixed(2)}
              </span>
            ) : null}
          </div>
          {discount && (
            <span
              data-test="productDiscount"
              className="bg-red-400 px-2 text-white"
            >
              {discount}% OFF
            </span>
          )}
        </div>
        <div
          data-test="productColorsRateContainer"
          className="flex items-center justify-between"
        >
          {/* <div data-test="productColors" className="flex gap-2">
            {attributes.map(({name,values}, i) => (
              <div
                onClick={() => handleColorSelection(i)}
                className={`cursor-pointer rounded-full border-[1px] ${
                  selectedColor === i ? "border-black" : ""
                } p-[1px]`}
              >
                <div
                  data-test="productColor"
                  key={i}
                  style={{ backgroundColor: color }}
                  className="h-3 w-3 rounded-full"
                ></div>
              </div>
            ))}
          </div> */}
          <Rate className="text-sm" allowHalf rating={rate} />
        </div>
      </div>
    </div>
  );
};
