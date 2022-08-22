import { useDateManipulation } from "hooks";
import { useTranslation } from "react-i18next";
import { DateDetails } from "utils";
import React from "react";
import { PriceDisplay } from "ui";
export interface ServiceRefundableTypeDescriptionProps {
  cost: number;
  duration: number;
  bookedDate: Date;
  displayCost?: boolean;
}

export const ServiceRefundableTypeDescription: React.FC<
  ServiceRefundableTypeDescriptionProps
> = ({ cost, duration, bookedDate, displayCost }) => {
  const { t } = useTranslation();
  const { addDays } = useDateManipulation(new Date(bookedDate).toString());
  const maxDate = addDays(duration);

  const date = DateDetails(maxDate || new Date());
  return (
    <div className="flex w-full items-center justify-between">
      {duration > 0 ? (
        <p>
          {t("Fully refundable before")} {date?.month_short} {date?.day}
        </p>
      ) : cost > 0 ? (
        <p>{t("Refundable before booked date")}</p>
      ) : (
        <p>{t("Non-refundable")}</p>
      )}
      {displayCost && cost > 0 ? (
        <PriceDisplay className="font-bold" price={cost} />
      ) : null}
    </div>
  );
};
