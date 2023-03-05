import { ProductDetailsTable } from "@blocks";
import { HotelsSearchList } from "@UI";
import React from "react";

export const SellerListing: React.FC<{}> = () => {
  const isProducts = false;
  const productComp = isProducts ? (
    <ProductDetailsTable />
  ) : (
    <HotelsSearchList />
  );

  return productComp;
};
