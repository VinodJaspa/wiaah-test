import React from "react";
import { Rate } from "antd";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  currency?: string;
  currencySymbol?: string;
  colors?: string[];
  liked?: boolean;
  buttonText: string;
  cashback?: string;
  discount?: number;
  oldPrice?: number;
  rating?: number;
  onLikeClick?: () => void;
  onButtonClick?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  colors = [],
  currency = "USD",
  currencySymbol = "$",
  imageUrl,
  liked,
  buttonText,
  cashback,
  discount,
  oldPrice,
  rating,
  onButtonClick,
  onLikeClick,
}) => {
  const [selectedColor, setSelectedColor] = React.useState<number>(0);
  const [hovered, setHovered] = React.useState<boolean>(false);

  function handleColorSelection(i: number) {
    setSelectedColor(i);
  }

  function handleLikeClick() {
    if (onLikeClick) {
      onLikeClick();
    }
  }

  function handleButtonClick() {
    if (onButtonClick) {
      onButtonClick(id);
    }
  }

  return (
    <div className="flex w-56 flex-col bg-white">
      <div
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative h-72 w-full "
      >
        {/* image */}
        <div className="absolute top-0 z-10 flex w-full items-center justify-between p-2">
          {cashback ? (
            <div className="bg-red-400 bg-opacity-70 px-4 text-white">
              {/* cash ack */}
              {cashback} Cashback
            </div>
          ) : (
            <span></span>
          )}
          <span
            onClick={() => handleLikeClick()}
            className="cursor-pointer text-2xl"
          >
            {/* love */}
            {liked ? <IoHeart className="fill-red-400" /> : <IoHeartOutline />}
          </span>
        </div>

        <div
          className={`${
            hovered
              ? "pointer-events-auto opacity-100 "
              : "pointer-events-none opacity-0"
          } absolute h-full w-full transition-all duration-300`}
        >
          <div className={`h-full w-full bg-black bg-opacity-20`}></div>
          <span
            onClick={() => handleButtonClick()}
            className="absolute left-1/2 bottom-12 w-8/12 -translate-x-1/2 cursor-pointer bg-white py-2 text-center text-xs text-black"
          >
            {buttonText}
          </span>
        </div>
        <img className="h-full w-full object-cover" src={imageUrl} alt={name} />
      </div>
      <div className="p-2">
        {/* name */}
        <span>{name}</span>
        <div className="flex items-center justify-between">
          {/* price and colors */}
          <div className="flex items-center gap-2">
            {/* price */}
            <span className="text-lg  font-bold">
              {currencySymbol}
              {price}
            </span>{" "}
            {oldPrice && (
              <span className="font-bold text-gray-400 line-through">
                {/* old price */}
                {currencySymbol}
                {oldPrice}
              </span>
            )}
          </div>
          {discount && (
            <span className="bg-red-400 px-2 text-white">{discount}% OFF</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {/* colors */}
            {colors.map((color, i) => (
              <div
                onClick={() => handleColorSelection(i)}
                className={`cursor-pointer rounded-full border-[1px] ${
                  selectedColor === i ? "border-black" : ""
                } p-[1px]`}
              >
                <div
                  key={i}
                  style={{ backgroundColor: color }}
                  className="h-3 w-3 rounded-full"
                ></div>
              </div>
            ))}
          </div>
          <Rate className="text-sm" allowHalf disabled value={rating} />
        </div>
      </div>
    </div>
  );
};
