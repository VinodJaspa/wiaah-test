import { EnvVars } from "@const";
import { useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js";
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
import { useForm } from "@UI/../utils/src";

const CheckoutForm = () => {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = React.useState<string>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${EnvVars.domain}`,
      },
    });

    if (error) setErrorMessage(error.message);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button type="submit" disabled={!stripe} className="w-full text-sm">
        {t("Submit")}
      </Button>
      {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
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
      <BoxShadow className="bg-white p-4 rounded-xl">
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-12 mt-10 space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-base">{t("Payment")}</span>
              {!isSellerOrBuyer && (
                <div className="flex items-center gap-2">
                  <Image src="/visa-logo.png" className="w-5" alt="visa" />
                  <Image src="/mastercard.svg" className="w-5" alt="mastercard" />
                  <Image src="/discover.png" className="w-5" alt="discover" />
                  <Image src="/american_express.png" className="w-5" alt="american_express" />
                </div>
              )}
            </div>

            {isSellerOrBuyer ? (
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between items-center">
                  <p className="font-medium uppercase">{t("CREDIT / DEBIT CARD")}</p>
                  <button
                    className="text-primary text-sm underline"
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    {t("Edit")}
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <img src="/mastercard.png" alt="Mastercard" className="w-10" />
                  <div className="flex flex-col gap-1">
                    <p>Mastercard (4505)</p>
                    <p>Exp: 06/23</p>
                    <p>John Doe</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-32">
                  <span className="font-medium">{t("CVV")}</span>
                  <Input id="cvv" name="cvv" className="text-sm" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex flex-col gap-1">
                  <span>{t("Card Number")}</span>
                  <Input placeholder="1234...14" id="CardNumberInput" name="cardNumber" className="text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <span>{t("Expiry Date")}</span>
                    <Input id="CardExpiryDateInput" placeholder="MM/YY" className="text-sm" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span>{t("CVC/CVV")}</span>
                    <Input id="CardCvvInput" placeholder="123" name="cvv" className="text-sm" />
                  </div>
                </div>
              </div>
            )}

            <Button
              colorScheme="darkbrown"
              className="self-end px-6 py-2 text-sm font-semibold"
              type="submit"
            >
              {t("Pay now")}
            </Button>
          </div>
        </div>
      </BoxShadow>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent className="w-[min(40rem,95%)] p-6 rounded-xl shadow-lg">
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex flex-col gap-1">
              <span>{t("Card Number")}</span>
              <Input placeholder="1234...14" id="CardNumberInput" name="cardNumber" className="text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <span>{t("Expiry Date")}</span>
                <Input id="CardExpiryDateInput" placeholder="MM/YY" className="text-sm" />
              </div>
              <div className="flex flex-col gap-1">
                <span>{t("CVC/CVV")}</span>
                <Input id="CardCvvInput" placeholder="123" name="cvc" className="text-sm" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span>{t("Card Holder Name")}</span>
              <Input placeholder="John Doe" id="cardHolderName" name="cardHolderName" className="text-sm" />
            </div>
            <Button
              colorScheme="darkbrown"
              className="self-end px-6 py-2 text-sm font-semibold"
              onClick={() => setIsEditModalOpen(false)}
            >
              {t("Save")}
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};
