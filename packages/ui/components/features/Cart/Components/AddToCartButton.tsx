import { ShoppingCartItemType } from "@features/API";
import { Button, ShoppingCartOutlinePlusIcon } from "@partials";
import React from "react";
import { useGetMyAccountQuery } from "@features/Accounts";
import { useMutateShoppingCart } from "@src/index";

type base = {
  itemId: string;
  itemType: ShoppingCartItemType;
  className?: string;
};

export const AddToCartButton: React.FC<
  ({ isExternal: boolean; externalUrl: string } & base) | ({} & base)
> = ({ itemId, itemType, className, ...props }) => {
  const { addShoppingCartItem } = useMutateShoppingCart();
  const { data } = useGetMyAccountQuery();

  return (
    <Button
      onClick={() => {
        data?.id
          ? addShoppingCartItem({
            itemId,
            type: itemType,
            quantity: 1,
            shippingRuleId: "1",
          })
          : null;
      }}
      className={className}
      colorScheme="darkbrown"
    >
      <ShoppingCartOutlinePlusIcon />
    </Button>
  );
};
