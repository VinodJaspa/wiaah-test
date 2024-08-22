import React, { useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { PiShoppingCartSimple } from "react-icons/pi";

export interface ShopProductCardProps {
  name: string;
  title: string;
  image: string;
  price: number;
  discount?: number;
  isLiked: boolean;
}

export const ShopProductCard: React.FC<ShopProductCardProps> = ({
  name,
  title,
  image,
  price,
  discount,
  isLiked,
}) => {
  const [liked, setLiked] = useState<boolean>(isLiked);
  const toggleIsLiked = () => {
    setLiked((prevState) => !prevState);
  };
  return (
    <div className="md:w-[274px] w-[170px] md:h-[318px] h-[240px] rounded-xl flex flex-col  shadow-xl ">
      <div className="relative md:h-[182px] h-[120px]">
        <img src={image} className=" w-full h-full rounded-t-xl object-cover" />
        {discount && (
          <p className="absolute top-2 left-2 px-2 py-0.5 rounded-xl bg-[#CEFFD9] text-[#3F8A4E] text-sm">
            {discount}%
          </p>
        )}
        <div className="absolute top-2 right-2 p-2 rounded-full bg-white">
          <PiShoppingCartSimple className="w-5 h-5" />
        </div>
      </div>
      <div className="p-3 flex flex-col justify-between h-full">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl text-[#6B6498]">{name}</h3>
            {liked ? (
              <IoHeartSharp
                className="w-5 h-5 cursor-pointer"
                onClick={toggleIsLiked}
              />
            ) : (
              <IoHeartOutline
                className="w-5 h-5 cursor-pointer"
                onClick={toggleIsLiked}
              />
            )}
          </div>
          <p className="text-sm text-[#999999]">{title}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[#403A63] text-lg font-bold">${price}</p>
          <button className=" bg-[#20ECA7] font-semibold py-1.5 px-3.5 rounded-full ">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
