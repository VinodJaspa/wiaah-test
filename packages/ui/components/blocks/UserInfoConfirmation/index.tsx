import React from "react";
import { useRecoilValue } from "recoil";
import { CheckoutProductsTotalPriceState } from "ui/state";
import { BoxShadow, Padding, FlexStack, BoldText, Spacer, Text } from "ui";
import { useTranslation } from "react-i18next";

export interface UserInfoConfirmationProps {}

export const UserInfoConfirmation: React.FC = () => {
  const { t } = useTranslation();
  const totalPrice = useRecoilValue(CheckoutProductsTotalPriceState);
  const payment = {
    type: "visa",
    cardEndings: 1234,
  };

  return (
    <BoxShadow>
      <div className="bg-white py-4">
        <Padding X={{ value: 2 }}>
          <FlexStack direction="vertical" verticalSpacingInRem={2}>
            <FlexStack justify="between" alignItems="center">
              <BoldText>
                <Text size="3xl">
                  {t("order_confirmation", "Order Confirmation")}
                </Text>
              </BoldText>
              <div className="flex items-center gap-2">
                <span>{t("order_total", "Order Total")}:</span>
                <span className="text-lg font-bold">${totalPrice}</span>
              </div>
            </FlexStack>
            <Padding X={{ value: 1 }}>
              <FlexStack>
                <table className="w-full">
                  <tr className="">
                    <td className="px-4 align-top">
                      <FlexStack
                        fullWidth
                        direction="vertical"
                        verticalSpacingInRem={0.25}
                      >
                        <FlexStack
                          fullWidth
                          justify="between"
                          alignItems="center"
                        >
                          <span className="text-lg font-semibold">
                            {t("your_inforomation", "Your Inforomation")}
                          </span>
                          <span className="text-blue-500">Edit</span>
                        </FlexStack>
                        <div
                          className="border-t-2 border-dashed border-black
                    border-opacity-10"
                        ></div>
                        <FlexStack direction="vertical">
                          <span className="font-semibold">Name</span>
                          <span>testemail@test.com</span>
                        </FlexStack>
                      </FlexStack>
                    </td>
                    <td className="px-4 align-top">
                      <FlexStack
                        fullWidth
                        direction="vertical"
                        verticalSpacingInRem={0.25}
                      >
                        <FlexStack
                          fullWidth
                          justify="between"
                          alignItems="center"
                        >
                          <span className="text-lg font-semibold">
                            {t("shipping_address", "Shipping Address")}
                          </span>
                          <span className="text-blue-500">Edit</span>
                        </FlexStack>
                        <div
                          className="border-t-2 border-dashed border-black
                    border-opacity-10"
                        ></div>
                        <FlexStack direction="vertical">
                          <span className="font-semibold">Name</span>
                          <span>710 Mariners Island Bivd,</span>
                          <span>Apt 210</span>
                          <span>San Mateo, CA 94404</span>
                          <span>United States</span>
                          <span>(315) 396-7661</span>
                        </FlexStack>
                      </FlexStack>
                    </td>
                  </tr>
                  <Spacer />
                  <tr className="py-4">
                    <td className="px-4 align-top">
                      <FlexStack
                        fullWidth
                        direction="vertical"
                        verticalSpacingInRem={0.25}
                      >
                        <FlexStack
                          fullWidth
                          justify="between"
                          alignItems="center"
                        >
                          <span className="text-lg font-semibold">
                            {t("payment", "Payment")}
                          </span>
                          <span className="text-blue-500">Edit</span>
                        </FlexStack>
                        <div
                          className="border-t-2 border-dashed border-black
                      border-opacity-10"
                        ></div>
                        <FlexStack direction="vertical">
                          <div className="h-12">
                            <img
                              src="/visa.svg"
                              alt="visa"
                              className="h-full"
                            />
                          </div>
                          <div>
                            <span className="capitalize">
                              {payment.type}{" "}
                              {t("card_ending_in", "card ending in")}{" "}
                              {payment.cardEndings}
                            </span>
                          </div>
                        </FlexStack>
                      </FlexStack>
                    </td>
                    <td className="px-4 align-top">
                      <FlexStack
                        fullWidth
                        direction="vertical"
                        verticalSpacingInRem={0.25}
                      >
                        <FlexStack
                          fullWidth
                          justify="between"
                          alignItems="center"
                        >
                          <span className="text-lg font-semibold">
                            {t("billing_address", "Billing Address")}
                          </span>
                          <span className="text-blue-500">Edit</span>
                        </FlexStack>
                        <div
                          className="border-t-2 border-dashed border-black
                      border-opacity-10"
                        ></div>
                        <FlexStack direction="vertical">
                          <span className="font-semibold">Name</span>
                          <span>710 Mariners Island Bivd,</span>
                          <span>Apt 210</span>
                          <span>San Mateo, CA 94404</span>
                          <span>United States</span>
                          <span>(315) 396-7661</span>
                        </FlexStack>
                      </FlexStack>
                    </td>
                  </tr>
                </table>
              </FlexStack>
            </Padding>
          </FlexStack>
        </Padding>
      </div>
    </BoxShadow>
  );
};
