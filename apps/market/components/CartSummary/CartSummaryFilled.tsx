import React from "react";
import { CartSummaryItem } from "types/market/CartSummary";
import { BoxShadow, CartSummaryProductCard, Divider, FlexStack } from "ui";

export interface CartSummaryFilledProps {
  items: {
    shop: {
      name: string;
      id: string;
      imageUrl: string;
    };
    item: CartSummaryItem;
  }[];
}

const CartSummaryFilled: React.FC<CartSummaryFilledProps> = ({ items }) => {
  return (
    <BoxShadow>
      <FlexStack direction="vertical" verticalSpacingInRem={0.5}>
        {items.map(({ item, shop }, i) => (
          <>
            <CartSummaryProductCard
              key={i}
              profile={{
                name: shop.name,
                profileId: shop.id,
                thumbnailUrl: shop.imageUrl,
              }}
              product={item}
            />
            {i + 1 < items.length && <Divider marginY={{ value: 0.25 }} />}
          </>
        ))}
      </FlexStack>
    </BoxShadow>
  );
};

export default CartSummaryFilled;
