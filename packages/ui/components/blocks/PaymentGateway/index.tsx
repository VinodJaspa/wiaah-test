import React from "react";
import { Form, Formik } from "formik";
import {
  BoxShadow,
  Padding,
  FlexStack,
  Input,
  Button,
  Grid,
  FormikInput,
} from "ui";
import * as yup from "yup";
import { CardDetails } from "types";
import { useTranslation } from "react-i18next";

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
export interface PaymentGatewayProps {
  onSuccess?: (cardDetails: CardDetails) => void;
}

export const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  onSuccess,
}) => {
  const { t } = useTranslation();
  return (
    <BoxShadow>
      <div className="bg-white">
        <div className="flex flex-col items-start gap-4 p-4">
          <div className="flex w-full items-center justify-between">
            <span id="PaymentTitle" className="text-3xl leading-loose">
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
            onSubmit={(res) => onSuccess && onSuccess(res)}
          >
            {({ errors, touched }) => (
              <Form className="w-full">
                <div className="w-full items-end gap-4 flex flex-col">
                  <div className="w-full flex flex-col gap-2">
                    <span>{t("card_number", "Card Number")}</span>
                    <FormikInput
                      placeholder="1234...14"
                      id="CardNumberInput"
                      name="cardNumber"
                    />
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <span>{t("expiry_date", "Expiry Date")}</span>
                      <FormikInput
                        id="CardExpiryDateInput"
                        placeholder="MM/YY"
                        name="expiryDate"
                      />
                    </div>
                    <div className="w-full gap-2 flex flex-col">
                      <span>{t("cvc/cvv", "CVC/CVV")}</span>
                      <FormikInput
                        id="CardCvvInput"
                        placeholder="1234"
                        name="cvv"
                        fullWidth
                      />
                    </div>
                  </div>
                  <Button
                    id="PayNowButton"
                    className="bg-black w-full px-8 py-2"
                    type="submit"
                  >
                    {t("pay_now", "Pay now")}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </BoxShadow>
  );
};
