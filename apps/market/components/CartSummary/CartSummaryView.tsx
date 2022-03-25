import React from "react";
import { useRecoilValue } from "recoil";
import { Button, FlexStack } from "ui";
import { CartSummaryItems } from "ui/state";
import EmptyCartSummary from "./EmptyCartSummary";

const CartSummaryView: React.FC = () => {
  const items = useRecoilValue(CartSummaryItems);

  return (
    <div className="m-4 w-full bg-white p-4 shadow-md">
      <FlexStack
        fullWidth={true}
        justify="center"
        alignItems="center"
        verticalSpacingInRem={2}
        direction="vertical"
      >
        <div className="w-full text-4xl font-bold">SHOPPING CART</div>
        {items.length < 1 && <EmptyCartSummary />}
        <div className="w-fit">
          <Button paddingXInRem={2}>Continue Shopping</Button>
        </div>
      </FlexStack>
    </div>
  );
};

export default CartSummaryView;
