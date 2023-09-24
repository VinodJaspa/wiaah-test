import React from "react";
import { setTestid } from "utils";

export const ProductSkeleton: React.FC = () => {
  return (
    <div
      {...setTestid("product-skeleton")}
      className="rounded p-4 w-full h-full bg-gray-100"
    >
      <div className="grid grid-cols-12 h-full gap-4 animate-pulse">
        <div className="grid col-span-12 row-span-4 bg-gray-200"></div>
        <div className="col-span-8 rounded bg-gray-200"></div>
        <div className="col-span-4 rounded bg-gray-200"></div>
        <div className="col-span-10 rounded bg-gray-200"></div>
        <div className="col-span-2 rounded bg-gray-200"></div>
        <div className="col-span-12 rounded bg-gray-200"></div>
        <div className="col-span-12 rounded bg-gray-200"></div>
      </div>
    </div>
  );
};
