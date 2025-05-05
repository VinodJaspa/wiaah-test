import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { useGetBookedServicesState } from "state";
import { Divider, PriceDisplay, Button, Stack } from "@UI";
import { CalculateVat, setTestid } from "utils";

export interface BookedServicesCostDetailsProps {
  vat: number;
  title: string;
  deposit?: number;
  subTotal: number;
  total: number;
  vatAmount: number;
  children?: React.ReactNode;
}

export const BookedServicesCostDetails: React.FC<
  BookedServicesCostDetailsProps
> = ({ vat, children, title, deposit, subTotal, total, vatAmount }) => {
const { t } = useTranslation();

  return (
    <Stack col>
      <>{children}</>

      <div
        {...setTestid("Subtotal")}
        className="text-sm font-medium flex justify-between items-center"
      >
        <p className="text-black font-medium text-sm">{t("Subtotal")}</p>
        <PriceDisplay
          // className="text-black text-sm text-opacity-50 font-medium"
          price={subTotal}
        />
      </div>
      <Divider />
      <div
        {...setTestid("Vat")}
        className="font-medium text-black text-sm flex justify-between items-center"
      >
        <p className="">{`${t("Vat")}(${vat}%)`}</p>
        <PriceDisplay
          // className="text-black text-sm text-opacity-50 font-medium"
          price={vatAmount}
        />
      </div>
      <Divider />
      <div
        {...setTestid("Total")}
        className="font-medium text-sm flex justify-between items-center"
      >
        <p>{t("Total")}</p>
        <PriceDisplay
          // className="text-black text-sm text-opacity-50 font-medium"
          price={subTotal + vatAmount}
        />
      </div>
    </Stack>
  );
};
