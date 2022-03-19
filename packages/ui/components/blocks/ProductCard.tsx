import React from "react";
import { FaHeart } from "react-icons/fa";
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
  onLikeClick: () => void;
  onButtonClick: (id: string) => void;
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
    onButtonClick(id);
  }

  return (
    <div className="flex flex-col bg-white">
      <div
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative h-72 w-60"
      >
        {/* image */}
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
        <div>
          {/* name */}
          {name}
        </div>
        <div className="flex items-center justify-between">
          {/* price */}
          <span className="font-bold">
            {currency} {currencySymbol}
            {price}
          </span>
          <span
            onClick={() => handleLikeClick()}
            className="cursor-pointer text-lg"
          >
            {/* love */}
            {liked ? <IoHeart className="fill-red-500" /> : <IoHeartOutline />}
          </span>
        </div>
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
                className="h-4 w-4 rounded-full"
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
