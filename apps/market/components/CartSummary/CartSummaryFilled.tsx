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
  function handleContactClick(shopId: string) {}

  function handleMoveToWishlist(productId: string) {}

  function handleProfileClick(shopId: string) {}

  function handleQtyChange(productId: string) {}

  function handleRemove(productId: string) {}

  return (
    <BoxShadow>
      <FlexStack direction="vertical" verticalSpacingInRem={0.5}>
        {items.map(({ item, shop }, i) => (
          <>
            <CartSummaryProductCard
              key={i}
              profile={{
                name: shop.name,
                id: shop.id,
                imageUrl: shop.imageUrl,
              }}
              onContactClick={(id) => handleContactClick(id)}
              onMoveToWishList={handleMoveToWishlist}
              onProfileClick={handleProfileClick}
              onQtyChange={handleQtyChange}
              onRemove={handleRemove}
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
