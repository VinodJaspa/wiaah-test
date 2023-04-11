import { ProductDetailsTable } from "@blocks";
import { StoreType } from "@features/API";
import {
  HotelsSearchList,
  useCursorScrollPagination,
  useGetUserServicesQuery,
  useGetUserShopType,
  UserServicesList,
} from "@UI";
import React from "react";

export const SellerListing: React.FC<{ accountId: string }> = ({
  accountId,
}) => {
  const { data: shop } = useGetUserShopType({ userId: accountId });
  const isProducts = shop.storeType === StoreType.Product;

  const productComp = isProducts ? (
    <ProductDetailsTable filters={[]} onDelete={() => {}} products={[]} />
  ) : (
    <UserServicesList accountId={accountId} />
  );

  return productComp;
};
