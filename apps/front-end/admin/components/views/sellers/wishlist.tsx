import {
  useAdminDeleteUserWishlistItem,
  useAdminGetUserWishlist,
  useGetMyWishlistQuery,
  WishlistTable,
} from "@UI";
import React from "react";

export const AccountWishlist: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
  const { data, isLoading, isError } = useGetMyWishlistQuery();
  const { mutate } = useAdminDeleteUserWishlistItem();

  return (
    <WishlistTable
      onAdd={() => {}}
      onDelete={(id) => {
        mutate({ accountId: id });
      }}
      items={data?.wishedItems}
    />
  );
};
