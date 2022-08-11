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

  return (
    <div className="flex items-center w-full justify-between">
      <label className="flex gap-1 items-center">
        <Radio
          onChange={(e) =>
            e.target.checked ? onSelected && onSelected(id) : null
          }
          name={name}
        />
        <ServiceRefundableTypeDescription
          cost={cost}
          duration={duration}
          bookedDate={new Date()}
        />
      </label>
      <span className="font-bold">
        {cost > 0 ? (
          <PriceDisplay priceObject={{ amount: cost }} />
        ) : duration > 0 ? (
          <p>{t("FREE")}</p>
        ) : null}
      </span>
    </div>
  );
};

export interface ServiceRefundableTypeDescription {
  cost: number;
  duration: number;
  bookedDate: Date;
}

export const ServiceRefundableTypeDescription: React.FC<
  ServiceRefundableTypeDescription
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
