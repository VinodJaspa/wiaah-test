import { SearchView, ShopProductCardsView } from "@UI";
import { shopProductCardsPlaceholder } from "placeholder";
import React from "react";
import { ShopProfile } from "./ShopProfile";

export const ShopDetailsView: React.FC<{ id: string }> = ({ id }) => {
  return (
    <div className="flex flex-col w-full ">
      <ShopProfile shopId={id} />
      <div className="flex justify-between w-full ">
        <SearchView />
      </div>
    </div>
  );
};
