import { t } from "i18next";
import React from "react";
import { useRecoilValue } from "recoil";
import { BoldText, BoxShadow, FlexStack, Grid, Padding, Text } from "ui";
import {
  CheckoutProductsTotalPriceState,
  CheckoutProductsState,
} from "ui/state";

export interface OrderConfirmationViewProps {}

const OrderConfirmationView: React.FC<OrderConfirmationViewProps> = () => {
  const totalPrice = useRecoilValue(CheckoutProductsTotalPriceState);
  const products = useRecoilValue(CheckoutProductsState);
  return (
    <div className="my-4 bg-white py-4">
      <Padding X={{ value: 2 }}>
        <FlexStack direction="vertical" verticalSpacingInRem={2}>
          <FlexStack justify="between" alignItems="center">
            <Text size="3xl">
              <BoldText>
                {t("order_confirmation", "Order Confirmation")}
              </BoldText>
            </Text>
            <FlexStack alignItems="center" horizontalSpacingInRem={0.5}>
              <div>{t("order_total", "Order Total")}:</div>
              <div className="text-lg font-bold">${totalPrice}</div>
            </FlexStack>
          </FlexStack>
          <BoxShadow>
            <Padding X={{ value: 2 }}>
              <FlexStack>
                <Grid fullWidth cols={2} colsGap={{ value: 1 }}>
                  <FlexStack
                    fullWidth
                    direction="vertical"
                    verticalSpacingInRem={0.25}
                  >
                    <FlexStack fullWidth justify="between" alignItems="center">
                      <span className="text-lg font-semibold">
                        Your Inforomation
                      </span>
                      <span className="text-blue-500">Edit</span>
                    </FlexStack>
                    <div
                      className="border-t-2 border-dashed border-black
                    border-opacity-10"
                    ></div>
                  </FlexStack>
                </Grid>
              </FlexStack>
            </Padding>
          </BoxShadow>
        </FlexStack>
      </Padding>
    </div>
  );
};

export default OrderConfirmationView;
