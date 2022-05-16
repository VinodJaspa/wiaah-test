import { Input } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

export interface PaymentPortalProps {}

export const PaymentPortal: React.FC<PaymentPortalProps> = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="hidden text-xl font-bold lg:block">
        {t("Enter_paymen_details", "Enter payment details")}
      </h2>
      <div className="rounded-md border-2 border-gray-300 px-4 py-6 lg:mt-8">
        <h3 className="text-lg font-bold">{t("Payment", "Payment")}</h3>
        <div className="flex flex-wrap items-center">
          {/* <Input type="radio" checked /> */}
          <span className="ml-4">
            {t("Credit_Debit_card", "Credit / Debit card")}
          </span>
          <img
            className="ml-2 inline h-8"
            src="/visa-logo.png"
            alt="visa logo"
          />
          <img
            className="ml-2 inline h-8"
            src="/master-card-logo.png"
            alt="master card logo"
          />
          <img
            className="ml-2 inline h-8"
            src="/american_express.png"
            alt="american express logo"
          />
          <img
            className="ml-2 inline h-8"
            src="/discover.png"
            alt="discover network logo"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="">{t("Name_on_Card", "Name on Card")}</label>
          <Input
            className="mt-2 mb-4 rounded-md border-gray-300"
            placeholder={t("Enter_Name", "Enter name")}
            name="name-on-card"
            id="name-on-card"
            type="text"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="">{t("Card_Number", "Card Number")}</label>
          <Input
            className="mt-2 mb-4 rounded-md border-gray-300"
            placeholder="2222 2222 2222 2222"
            name="name-on-card"
            id="name-on-card"
            type="text"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div className="mr-2 w-6/12">
            <label htmlFor="">{t("Expiry_Date", "Expiry Date")}</label>
            <Input
              className="mt-2 mb-4 rounded-md border-gray-300"
              placeholder="MM/YY"
              name="name-on-card"
              id="name-on-card"
              type="text"
            />
          </div>
          <div className="ml-2 w-6/12">
            <label htmlFor="">CVC/CVV</label>
            <Input
              className="mt-2 mb-4 rounded-md border-gray-300"
              placeholder="123"
              name="name-on-card"
              id="name-on-card"
              type="text"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="green-background rounded-md py-2 px-4 text-white">
            {t("Pay_Now", "Pay Now")}
          </button>
        </div>
      </div>
    </div>
  );
};
