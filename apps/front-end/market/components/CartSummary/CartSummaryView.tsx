import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  BoxShadow,
  Button,
  TotalCost,
  SpinnerFallback,
  FlexStack,
  Padding,
  Spacer,
  useScreenWidth,
  useGetMyCartSummaryDataQuery,
} from "ui";
import CartSummaryFilled from "./CartSummaryFilled";
import EmptyCartSummary from "./EmptyCartSummary";

export const CartSummaryView: React.FC = () => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const { visit } = useRouting();
  const { min } = useScreenWidth({ minWidth: 900 });
  const { data: res, isLoading, isError } = useGetMyCartSummaryDataQuery();
  const cartSummaryItems = res ? res.data : [];

  function handleCheckout() {
    visit((routes) => routes.visitCheckout());
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
        <div className="flex flex-grow flex-col bg-white p-4">
          <div className="w-full text-3xl font-bold">
            {t("SHOPPING CART")}{" "}
            {cartSummaryItems.length > 0
              ? `(${cartSummaryItems.length} ${t("items")})`
              : null}
          </div>
          <Spacer />
          {cartSummaryItems.length > 0 ? (
            <CartSummaryFilled />
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
                  <SpinnerFallback isLoading={isLoading} isError={isError}>
                    {res ? (
                      <TotalCost
                        subTotal={res.data.reduce((acc, curr) => {
                          return acc + curr.itemData.data.price;
                        }, 0)}
                        vat={10}
                        voucherRemoveable
                      />
                    ) : null}
                  </SpinnerFallback>
                  <Button onClick={handleCheckout}>
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
