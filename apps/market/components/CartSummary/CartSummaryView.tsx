import { t } from "i18next";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilValue } from "recoil";
import {
  BoldText,
  BoxShadow,
  Button,
  CartSummaryTable,
  Divider,
  FlexStack,
  Padding,
  useCartSummary,
} from "ui";
import { Rounded } from "ui/components/partials/Rounded";
import { CartSummaryTotalPriceState } from "ui/state";
import CartSummaryFilled from "./CartSummaryFilled";
import EmptyCartSummary from "./EmptyCartSummary";

const CartSummaryView: React.FC = () => {
  const router = useRouter();
  const { ChangeQuantity, RemoveItem, cartSummaryItems } = useCartSummary();
  const totalPrice = useRecoilValue(CartSummaryTotalPriceState);
  const deliveryFee = 0;

  function handleCheckout() {
    router.push("/checkout");
  }

  return (
    <FlexStack fullWidth horizontalSpacingInRem={1}>
      <BoxShadow>
        <FlexStack fullWidth={true}>
          <Padding X={{ value: 1 }} Y={{ value: 1 }}>
            <div className="w-full text-4xl font-bold">
              {t("shopping_cart", "SHOPPING CART")}{" "}
              {cartSummaryItems.length > 0
                ? `(${cartSummaryItems.length} items)`
                : null}
            </div>
            {cartSummaryItems.length < 1 ? (
              <EmptyCartSummary />
            ) : (
              <CartSummaryFilled items={cartSummaryItems} />
            )}
          </Padding>
        </FlexStack>
      </BoxShadow>
      <BoxShadow>
        <Padding X={{ value: 1, unit: "rem" }} Y={{ value: 1, unit: "rem" }}>
          <FlexStack direction="vertical" verticalSpacingInRem={1}>
            {/* checkout */}
            <BoldText>Total</BoldText>
            <FlexStack justify="between" fullWidth>
              <p>{t("sub_total", "SubTotal")}</p>
              <BoldText>${totalPrice}</BoldText>
            </FlexStack>
            <FlexStack justify="between" fullWidth>
              <p>{t("delivery", "Delivery")}</p>
              <BoldText>${deliveryFee}</BoldText>
            </FlexStack>
            <Divider />
            <BoldText>{t("total_vat", "Total (VAT included)")}</BoldText>
            <Rounded radius="xl">
              <Button onClick={handleCheckout} paddingXInRem={2}>
                {t("go_to_checkout", "GO TO CHECKOUT")}
              </Button>
            </Rounded>
          </FlexStack>
        </Padding>
      </BoxShadow>
    </FlexStack>
  );
};

export default CartSummaryView;
