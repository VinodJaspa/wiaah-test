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
  useScreenWidth,
} from "ui";
import { DividerProps } from "ui/components/partials/Divider";
import { CartSummaryItemsState, CheckoutProductsState } from "@src/state";

export interface OrderConfirmationViewProps { }

const randomNum = (max: number) => Math.floor(Math.random() * max);

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
            {/* TODO: UserInfoConfirmation component */}
            {/* <UserInfoConfirmation /> */}
            <div className="flex flex-col items-end gap-4 bg-white p-4 ">
              <Spacer spaceInRem={2} />
              <OrderConfirmationProductsTable
                products={products}
                onRemove={handleRemoveProduct}
              />
              <div className="w-96">
                <TotalCost subTotal={randomNum(500)} vat={randomNum(20)} />
              </div>
            </div>
          </FlexStack>
        </FlexStack>
      </BoxShadow>
    </Padding>
  );
};

export default OrderConfirmationView;
