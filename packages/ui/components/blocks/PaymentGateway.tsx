import { t } from "i18next";
import React from "react";
import { Form, Formik, Field } from "formik";
import { CardDetails } from "types/market/Checkout";
import { InputErrorMsg } from "types/sharedTypes/misc/ErrorMsg";
import {
  BoxShadow,
  Padding,
  FlexStack,
  Input,
  Button,
  Text,
  Grid,
} from "../partials";
import * as yup from "yup";

const schema = yup.object().shape({
  expiryDate: yup.string().required("Expiry Date is required"),
  cardNumber: yup
    .string()
    .required("Card Number is required")
    .matches(/^\d+$/, "Card number should only have numbers")
    .min(14, "Card Number must be at least 14 numbers"),
  cvv: yup
    .string()
    .required("CVV Number is Required")
    .matches(/^\d+$/, "CVV number should only have numbers")
    .min(3, "CVV Number must be at least 3 numbers"),
});
export interface PaymentGatewayProps {}

export const PaymentGateway: React.FC<PaymentGatewayProps> = ({}) => {
  return (
    <BoxShadow>
      <div className="bg-white">
        <Padding X={{ value: 2 }} Y={{ value: 1 }}>
          <FlexStack
            alignItems="start"
            direction="vertical"
            verticalSpacingInRem={1}
          >
            <div className="flex w-full items-center justify-between">
              <span className="text-3xl leading-loose">
                {t("payment", "Payment")}
              </span>
              <div className="flex h-12 items-center gap-2">
                <img className="h-full" src="/visa.svg" />
                <img className="h-full" src="/mastercard.svg" />
                <img className="h-full" src="/amex.svg" />
                <img className="h-full" src="/discover.png" />
                <img className="h-full" src="/american_express.png" />
              </div>
            </div>
            <Formik
              validationSchema={schema}
              initialValues={{
                cardNumber: "",
                expiryDate: "",
                cvv: "",
              }}
              onSubmit={(res) => console.log(res)}
            >
              {({ errors, touched }) => (
                <Form className="w-full">
                  <FlexStack
                    fullWidth
                    alignItems="end"
                    verticalSpacingInRem={1}
                    direction="vertical"
                  >
                    <FlexStack
                      fullWidth
                      verticalSpacingInRem={0.5}
                      direction="vertical"
                    >
                      <span>{t("card_number", "Card Number")}</span>
                      <Input
                        formik
                        placeholder="1234...14"
                        message={
                          errors.cardNumber && touched.cardNumber
                            ? {
                                error: true,
                                msg: errors.cardNumber,
                              }
                            : undefined
                        }
                        name="cardNumber"
                      />
                    </FlexStack>
                    <Grid fullWidth cols={2} colsGap={{ value: 1 }}>
                      <FlexStack
                        fullWidth
                        verticalSpacingInRem={0.5}
                        direction="vertical"
                      >
                        <span>{t("expiry_date", "Expiry Date")}</span>
                        <Input
                          placeholder="MM/YY"
                          formik
                          message={
                            errors.expiryDate
                              ? {
                                  error: true,
                                  msg: errors.expiryDate,
                                }
                              : undefined
                          }
                          fullWidth
                          name="expiryDate"
                        />
                      </FlexStack>
                      <FlexStack
                        fullWidth
                        verticalSpacingInRem={0.5}
                        direction="vertical"
                      >
                        <span>{t("cvc/cvv", "CVC/CVV")}</span>
                        <Input
                          formik
                          placeholder="1234"
                          message={
                            errors.cvv
                              ? {
                                  error: true,
                                  msg: errors.cvv,
                                }
                              : undefined
                          }
                          name="cvv"
                          fullWidth
                        />
                      </FlexStack>
                    </Grid>
                    <Button
                      hexBackgroundColor="#000"
                      fitWidth
                      paddingX={{ value: 2 }}
                      paddingY={{ value: 0.5 }}
                      type="submit"
                    >
                      {t("pay_now", "Pay now")}
                    </Button>
                  </FlexStack>
                </Form>
              )}
            </Formik>
          </FlexStack>
        </Padding>
      </div>
    </BoxShadow>
  );
};
