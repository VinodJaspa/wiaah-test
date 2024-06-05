import {
  useAdminDeleteUserWishlistItem,
  useAdminGetUserWishlist,
  WishlistTable,
} from "@UI";
import React from "react";

export const AccountWishlist: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
  const { data: wishedItem } = useAdminGetUserWishlist(accountId);
  const { mutate } = useAdminDeleteUserWishlistItem();

  return (
    <WishlistTable
      onAdd={() => {}}
      onDelete={(id) => {
        mutate(id);
      }}
      items={wishedItem}
    />
  );
};
