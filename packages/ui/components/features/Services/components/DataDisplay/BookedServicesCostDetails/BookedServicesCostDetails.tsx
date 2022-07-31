import React from "react";
import { useTranslation } from "react-i18next";
import { useGetBookedServicesState } from "state";
import { Divider, PriceDisplay } from "ui";
import { CalculateVat } from "utils";

export interface BookedServicesCostDetailsProps {
  vat: number;
  title: string;
}

export const BookedServicesCostDetails: React.FC<
  BookedServicesCostDetailsProps
> = ({ title, vat }) => {
  const { bookedServices } = useGetBookedServicesState();
  const { t } = useTranslation();
  const Subtotal = bookedServices.reduce((acc, curr) => acc + curr.price, 0);
  const vatCost = CalculateVat(Subtotal, vat);
  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold">{title}</p>
      <Divider />
      <div className="flex flex-col gap-2">
        {Array.isArray(bookedServices) ? (
          bookedServices.length > 0 ? (
            bookedServices.map((service, i) => (
              <div
                key={i}
                className="flex font-semibold justify-between items-center"
              >
                <p>
                  {service.name} x {service.qty}
                </p>
                <PriceDisplay priceObject={{ amount: service.price }} />
              </div>
            ))
          ) : (
            <p className="font-semibold">{`${t("No")} ${title} ${t(
              "were booked yet"
            )}`}</p>
          )
        ) : null}
      </div>
      <Divider />
      <div className="font-bold flex justify-between items-center">
        <p>{t("Subtotal")}</p>
        <PriceDisplay priceObject={{ amount: Subtotal }} />
      </div>
      <Divider />
      <div className="font-bold flex justify-between items-center">
        <p>{t("VAT")}</p>
        <PriceDisplay priceObject={{ amount: vatCost }} />
      </div>
      <Divider />
      <div className="font-bold flex justify-between items-center">
        <p>{t("Total")}</p>
        <PriceDisplay priceObject={{ amount: Subtotal + vatCost }} />
      </div>
    </div>
  );
};
