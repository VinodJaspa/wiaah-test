import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import {
  BoldText,
  BoxShadow,
  Button,
  Checkbox,
  Divider,
  Draggable,
  FlexStack,
  HStack,
  Image,
  Padding,
  PriceDisplay,
  Spacer,
  Text,
  useCartSummary,
  useGetMyShoppingCartQuery,
  useResponsive,
  useScreenWidth,
} from "ui";
import { CartSummaryTotalPriceState } from "@src/state";
import { CartSummaryFilled } from "./CartSummaryFilled";
import { EmptyCartSummary } from "./EmptyCartSummary";
import { mapArray } from "@UI/../utils/src";
import { CartItem, ServiceType, ShoppingCartItemType } from "@features/API";

export interface CartSummaryViewProps { }

export const CartSummaryView: React.FC<CartSummaryViewProps> = () => {
const { t } = useTranslation();
  const router = useRouter();
  const { min } = useScreenWidth({ minWidth: 900 });
  const { cartSummaryItems } = useCartSummary();
  const { data } = useGetMyShoppingCartQuery();
  const totalPrice = useRecoilValue(CartSummaryTotalPriceState);
  const deliveryFee = 0;
  const { isMobile } = useResponsive();

  const cartItems = [] as CartItem[];

  function handleCheckout() {
    router.push("/checkout");
  }

  return isMobile ? (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {mapArray(cartItems, (item) => (
          // TODO: bind props
          (<ShoppingCartMobileItem
            thumbnail={item.product?.thumbnail || ""}
            title={item.product?.title || ""}
            checkin={new Date(item.checkin!)}
            serviceType={item.service?.type}
            type={item.itemType}
            checkout={new Date(item.checkout!)}
            duration={item.service?.duration || 0}
            guests={item.guests || 0}
          />)
        ))}
      </div>
    </div>
  ) : (
    <FlexStack direction="vertical" fullWidth horizontalSpacingInRem={1}>
      <Spacer spaceInRem={2} />
      <FlexStack
        fitHeight
        fullWidth
        horizontalSpacingInRem={2}
        verticalSpacingInRem={2}
        direction={min ? "vertical" : "horizontal"}
      >
        <div className="flex flex-grow flex-col bg-white p-4">
          <div className="w-full text-3xl font-bold">
            {t("shopping_cart", "SHOPPING CART")}{" "}
            {cartSummaryItems.length > 0
              ? `(${cartSummaryItems.length} ${t("items", "items")})`
              : null}
          </div>
          <Spacer />
          {cartSummaryItems.length > 0 ? (
            <CartSummaryFilled items={cartSummaryItems} />
          ) : (
            <EmptyCartSummary />
          )}
        </div>
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
                  <Divider />
                  <Text size="xl">
                    <FlexStack justify="between">
                      <BoldText>{t("Total (VAT included)")}</BoldText>
                      <PriceDisplay />
                    </FlexStack>
                  </Text>
                  <Button onClick={handleCheckout}>
                    {t("GO TO CHECKOUT")}
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

const ShoppingCartMobileItem: React.FC<{
  thumbnail: string;
  title: string;
  checkin?: Date;
  checkout?: Date;
  duration?: number;
  guests?: number;
  type: ShoppingCartItemType;
  serviceType?: ServiceType;
  children?: React.ReactNode;
}> = ({
  checkin,
  thumbnail,
  title,
  checkout,
  children,
  duration,
  guests,
  type,
}) => {
    const [] = React.useState<boolean>();
    return (
      <Draggable onChange={({ x, y }) => { }} direction="horizontal">
        <HStack>
          <Checkbox />
          <div className="flex gap-1">
            <Image src={thumbnail} className="h-full object-cover w-24"></Image>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium">{title}</p>
            </div>
          </div>
        </HStack>
      </Draggable>
    );
  };

export default CartSummaryView;
