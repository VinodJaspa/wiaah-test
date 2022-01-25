import React from "react";

interface CardProps {
  imgUrl?: string;
}

export const Card: React.FC<CardProps> = ({ imgUrl }) => {
  return (
    <>
      <div className="block w-70">
        <div className="flex w-full p-4 justify-center bg-black text-white">
          <p className="uppercase">Shop Name</p>
        </div>
        <img src={imgUrl} alt="shop_img" className="w-full h-56 object-cover" />
      </div>
    </>
  );
};
