import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { useGetBookedServicesState } from "state";
import { Divider, PriceDisplay, Button, Stack } from "@UI";
import { CalculateVat, setTestid } from "utils";

export interface BookedServicesCostDetailsProps {
  vat: number;
  title: string;
}

export const BookedServicesCostDetails: React.FC<
  BookedServicesCostDetailsProps
> = ({ vat, children }) => {
  const { visit } = useRouting();
  const { bookedServices } = useGetBookedServicesState();
  const { t } = useTranslation();
  const Subtotal = bookedServices.reduce(
    (acc, curr) => acc + curr.price * curr.qty,
    0
  );
  const vatCost = CalculateVat(Subtotal, vat);

  return (
    <Stack col divider={<Divider />}>
      {children}

      <div
        {...setTestid("Subtotal")}
        className="text-sm font-medium flex justify-between items-center"
      >
        <p className="text-black font-medium text-sm">{t("Subtotal")}</p>
        <PriceDisplay
          className="text-black text-sm text-opacity-50 font-medium"
          price={Subtotal}
        />
      </div>
      <div
        {...setTestid("Vat")}
        className="font-medium text-black text-sm flex justify-between items-center"
      >
        <p className="">{`${t("Vat")}(${vat}%)`}</p>
        <PriceDisplay
          className="text-black text-sm text-opacity-50 font-medium"
          price={vatCost}
        />
      </div>
      <div
        {...setTestid("Total")}
        className="font-medium text-sm flex justify-between items-center"
      >
        <p>{t("Total")}</p>
        <PriceDisplay
          className="text-black text-sm text-opacity-50 font-medium"
          price={Subtotal + vatCost}
        />
      </div>
    </Stack>
  );
};
