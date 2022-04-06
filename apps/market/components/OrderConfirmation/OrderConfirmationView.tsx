import { t } from "i18next";
import { useRouter } from "next/router";
import React from "react";
import { BsTrash } from "react-icons/bs";

import {
  BoldText,
  BoxShadow,
  Clickable,
  Divider,
  FlexStack,
  Image,
  OrderConfirmationProductsTable,
  Padding,
  Prefix,
  Spacer,
  Text,
  TotalCost,
  useCartSummary,
  UserInfoConfirmation,
  useScreenWidth,
} from "ui";
import { DividerProps } from "ui/components/partials/Divider";
import { CartSummaryItemsState, CheckoutProductsState } from "ui/state";

export interface OrderConfirmationViewProps {}

const OrderConfirmationView: React.FC<OrderConfirmationViewProps> = () => {
  const router = useRouter();
  const { products, RemoveItem } = useCartSummary();
  const { min } = useScreenWidth({ minWidth: 1024 });
  function handleRemoveProduct(productId: string) {
    RemoveItem(productId);
  }

  return (
    <Padding Y={{ value: 2 }}>
      <BoxShadow>
        <FlexStack
          direction={min ? "vertical" : "horizontal"}
          horizontalSpacingInRem={1}
          fullWidth
        >
          <FlexStack fullWidth direction="vertical">
            <UserInfoConfirmation />
            <div className="flex flex-col items-end gap-4 bg-white p-4 ">
              <Spacer spaceInRem={2} />
              <OrderConfirmationProductsTable
                products={products}
                onRemove={handleRemoveProduct}
              />
              <div className="w-96">
                <TotalCost />
              </div>
            </div>
          </FlexStack>
        </FlexStack>
      </BoxShadow>
    </Padding>
  );
};

export default OrderConfirmationView;
