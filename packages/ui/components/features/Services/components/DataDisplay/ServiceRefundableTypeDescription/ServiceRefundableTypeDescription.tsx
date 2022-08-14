import { useDateManipulation } from "hooks";
import { useTranslation } from "react-i18next";
import { DateDetails } from "utils";
import React from "react";
export interface ServiceRefundableTypeDescriptionProps {
  cost: number;
  duration: number;
  bookedDate: Date;
}

export const ServiceRefundableTypeDescription: React.FC<
  ServiceRefundableTypeDescriptionProps
> = ({ cost, duration, bookedDate }) => {
  const { t } = useTranslation();
  const { addDays } = useDateManipulation(new Date(bookedDate).toString());
  const maxDate = addDays(duration);

  const date = DateDetails(maxDate || new Date());
  return (
    <>
      {duration > 0 ? (
        <p>
          {t("Fully refundable before")} {date?.month_short} {date?.day}
        </p>
      ) : cost > 0 ? (
        <p>{t("Refundable before booked date")}</p>
      ) : (
        <p>{t("Non-refundable")}</p>
      )}
    </>
  );
};
