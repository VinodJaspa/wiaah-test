import { SearchView } from "@UI";
import React from "react";
import { ShopProfile } from "./ShopProfile";

export const ShopDetailsView: React.FC<{ id: string }> = ({ id }) => {
  return (
    <div className="flex flex-col w-full h-full ">
      <ShopProfile shopId={id} />
      <div className="flex justify-between w-full h-full ">
        <SearchView />
      </div>
    </div>
  );
};
