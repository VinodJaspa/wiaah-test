import { EnvVars } from "@const";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import {
  BoxShadow,
  Button,
  Image,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@UI";
import React, { FormEvent } from "react";
import { useTranslation } from "react-i18next";

import { PaymentElement } from "@stripe/react-stripe-js";
import { useForm } from "@UI/../utils/src";

const CheckoutForm = () => {
const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = React.useState<string>();

  const handleSubmit = async (event: FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was ussed to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${EnvVars.domain}`,
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button type="submit" disabled={!stripe}>
        {t("Submit")}
      </Button>
      {/* Show error message to your customers */}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </form>
  );
};

type PaymentData = {
  cardNumber: string;
  month: number;
  year: number;
  cvc: string;
};
export interface PaymentGatewayProps {
  onSuccess: (data: PaymentData) => any;
  isSellerOrBuyer?: boolean;
}

export const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  onSuccess,
  isSellerOrBuyer,
}) => {
const { t } = useTranslation();
  const { inputProps } = useForm<PaymentData>({
    cardNumber: "",
    cvc: "",
    month: new Date().getMonth(),
    year: parseInt(new Date().toLocaleDateString("en-us", { year: "2-digit" })),
  });
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  return (
    <>
      <BoxShadow>
        <div className="bg-white rounded-3xl">
          <div className="flex flex-col items-start gap-4 p-4">
            <div className="flex w-full items-center justify-between">
              <span
                id="PaymentTitle"
                className="text-2xl font-semibold leading-loose"
              >
                {t("Payment")}
              </span>
              {!isSellerOrBuyer && (
                <div className="flex h-12 items-center gap-2">
                  <Image src="/visa-logo.png" className="w-6" alt="visa" />
                  <Image
                    src="/mastercard.svg"
                    className="w-6"
                    alt="mastercard"
                  />
                  <Image src="/discover.png" className="w-6" alt="discover" />
                  <Image
                    src="/american_express.png"
                    className="w-6"
                    alt="american_express"
                  />
                </div>
              )}
            </div>
            <div className="w-full items-end gap-6 flex flex-col">
              {isSellerOrBuyer && (
                <div className="w-full flex flex-col gap-y-4 text-lg">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">CREDIT / DEBIT CARD</p>
                    <button onClick={() => setIsEditModalOpen(true)}>
                      Edit
                    </button>
                  </div>
                  <div className="flex items-start gap-x-4">
                    <img
                      src="/mastercard.png"
                      alt="Mastercard"
                      className="w-10"
                    />
                    <div className="flex flex-col gap-y-1">
                      <p>Mastercard (4505)</p>
                      <p>Exp: 06/23</p>
                      <p>John Doe</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-medium">{t("CVV")}</span>
                    <Input id="cvv" name="cvv" className="max-w-48" />
                  </div>
                </div>
              )}

              {!isSellerOrBuyer && (
                <>
                  <div className="w-full flex flex-col gap-2">
                    <span className="text-lg font-medium">
                      {t("Card Number")}
                    </span>
                    <Input
                      placeholder="1234...14"
                      id="CardNumberInput"
                      name="cardNumber"
                    />
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <span className="text-lg font-semibold">
                        {t("Expiry Date")}
                      </span>
                      <Input id="CardExpiryDateInput" placeholder="MM/YY" />
                    </div>
                    <div className="w-full gap-2 flex flex-col">
                      <span className="uppercase text-lg font-semibold">
                        {t("cvc/cvv")}
                      </span>
                      <Input id="CardCvvInput" placeholder="1234" name="cvv" />
                    </div>
                  </div>
                </>
              )}
              <Button
                colorScheme="darkbrown"
                id="PayNowButton"
                className="self-end text-lg font-semibold px-[1.5rem] py-[0.75rem]"
                type="submit"
              >
                {t("Pay now")}
              </Button>
            </div>
          </div>
        </div>
      </BoxShadow>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent className="w-[min(50rem,100%)] p-6">
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col gap-2">
              <span className="text-lg font-medium">{t("Card Number")}</span>
              <Input
                placeholder="1234...14"
                id="CardNumberInput"
                name="cardNumber"
              />
            </div>
            <div className="w-full grid grid-cols-2 gap-4">
              <div className="w-full flex flex-col gap-2">
                <span className="text-lg font-semibold">
                  {t("Expiry Date")}
                </span>
                <Input id="CardExpiryDateInput" placeholder="MM/YY" />
              </div>
              <div className="w-full gap-2 flex flex-col">
                <span className="uppercase text-lg font-semibold">
                  {t("cvc/cvv")}
                </span>
                <Input id="CardCvvInput" placeholder="1234" name="cvc" />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <span className="text-lg font-medium">
                {t("Card Holder Name")}
              </span>
              <Input
                placeholder="John Doe"
                id="cardHolderName"
                name="cardHolderName"
              />
            </div>
            <Button
              colorScheme="darkbrown"
              className="self-end text-lg font-semibold px-[1.5rem] py-[0.75rem]"
              onClick={() => {
                setIsEditModalOpen(false);
              }}
            >
              {t("Save")}
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};
