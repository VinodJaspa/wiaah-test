import { ServiceCancelationPolicyType } from "api";
import { useDateManipulation } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { Radio, PriceDisplay } from "ui";
import { DateDetails } from "utils";

export interface ServiceCancelationPolicyInputProps
  extends ServiceCancelationPolicyType {
  name: string;
  onSelected: (id: string) => any;
}

export const ServiceCancelationPolicyInput: React.FC<
  ServiceCancelationPolicyInputProps
> = ({ cost, duration, id, children, name, onSelected }) => {
  const { t } = useTranslation();
  const { addDays } = useDateManipulation(new Date(Date.now()).toString());

  const maxDate = addDays(duration);
  const { month_short, day } = DateDetails(maxDate || new Date());

  return (
    <div className="flex items-center w-full justify-between">
      <label className="flex gap-1 items-center">
        <Radio
          onChange={(e) =>
            e.target.checked ? onSelected && onSelected(id) : null
          }
          name={name}
        />
        {duration > 0 ? (
          <p>
            {t("Fully refundable before")} {month_short} {day}
          </p>
        ) : (
          <p>{t("Refundable before booked date")}</p>
        )}
      </label>
      <span className="font-bold">
        {cost > 0 ? (
          <PriceDisplay priceObject={{ amount: cost }} />
        ) : (
          <p>{t("FREE")}</p>
        )}
      </span>
    </div>
  );
};
