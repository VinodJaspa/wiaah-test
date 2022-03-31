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
  Spacer,
  Text,
  useCartSummary,
  useScreenWidth,
} from "ui";
import { Rounded } from "ui/components/partials/Rounded";
import { CartSummaryTotalPriceState } from "ui/state";
import CartSummaryFilled from "./CartSummaryFilled";
import EmptyCartSummary from "./EmptyCartSummary";

const CartSummaryView: React.FC = () => {
  const router = useRouter();
  const { min } = useScreenWidth({ minWidth: 900 });
  const { ChangeQuantity, RemoveItem, cartSummaryItems } = useCartSummary();
  const totalPrice = useRecoilValue(CartSummaryTotalPriceState);
  const deliveryFee = 0;

  function handleCheckout() {
    router.push("/checkout");
  }

  return (
    <FlexStack direction="vertical" fullWidth horizontalSpacingInRem={1}>
      <Spacer spaceInRem={2} />
      <FlexStack
        fitHeight
        fullWidth
        horizontalSpacingInRem={2}
        verticalSpacingInRem={2}
        direction={min ? "vertical" : "horizontal"}
      >
        {cartSummaryItems.length < 1 ? (
          <EmptyCartSummary />
        ) : (
          <div className="bg-white">
            <Padding X={{ value: 1 }} Y={{ value: 1 }}>
              <div className="w-full text-3xl font-bold">
                {t("shopping_cart", "SHOPPING CART")}{" "}
                {cartSummaryItems.length > 0
                  ? `(${cartSummaryItems.length} ${t("items", "items")})`
                  : null}
              </div>
              <Spacer />
              <CartSummaryFilled items={cartSummaryItems} />
            </Padding>
          </div>
        )}
        <div>
          <BoxShadow>
            <div className="bg-white">
              <Padding X={{ value: 1 }} Y={{ value: 1 }}>
                <FlexStack
                  width={min ? { value: 100, unit: "%" } : { value: 30 }}
                  direction="vertical"
                  verticalSpacingInRem={2}
                >
                  {/* checkout */}
                  <BoldText>
                    <Text size="3xl">Total</Text>
                  </BoldText>
                  <Text size="lg">
                    <FlexStack justify="between" fullWidth>
                      {t("sub_total", "SubTotal")}
                      <BoldText>${totalPrice}</BoldText>
                    </FlexStack>
                  </Text>
                  <Text size="lg">
                    <FlexStack justify="between" fullWidth>
                      {t("delivery", "Delivery")}
                      <BoldText>${deliveryFee}</BoldText>
                    </FlexStack>
                  </Text>
                  <Divider marginY={{ value: 0.9 }} />
                  <Text size="xl">
                    <FlexStack justify="between">
                      <BoldText>
                        {t("total_vat", "Total (VAT included)")}
                      </BoldText>
                      <BoldText>${totalPrice}</BoldText>
                    </FlexStack>
                  </Text>
                  <Button paddingY={{ value: 0.5 }} onClick={handleCheckout}>
                    {t("go_to_checkout", "GO TO CHECKOUT")}
                  </Button>
                </FlexStack>
              </Padding>
            </div>
          </BoxShadow>
        </div>
      </FlexStack>
    </FlexStack>
  );
};

export default CartSummaryView;
