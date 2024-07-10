import React, { DetailedHTMLProps, HTMLAttributes } from "react";

export interface WishListIcon
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

export const WishListIcon: React.FC<WishListIcon> = () => {
  return (
    <div className="h-12 w-12 cursor-pointer bg-gray-100 px-2 ">
      <img
        className="h-full w-full object-contain"
        src="/heart.svg"
        alt="wishlist"
      />
    </div>
  );
};
