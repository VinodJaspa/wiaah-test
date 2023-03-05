import {
  useAdminDeleteUserWishlistItem,
  useAdminGetUserWishlist,
  WishlistTable,
} from "@UI";
import React from "react";

export const wishlist: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
  const { data } = useAdminGetUserWishlist(accountId);
  const { mutate } = useAdminDeleteUserWishlistItem();

  return (
    <WishlistTable
      onAdd={() => {}}
      onDelete={(id) => {
        mutate(id);
      }}
      items={data}
    />
  );
};
