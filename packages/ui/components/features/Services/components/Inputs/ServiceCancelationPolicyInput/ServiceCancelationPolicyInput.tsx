import { ServiceCancelationPolicyType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { Radio, PriceDisplay, ServiceRefundableTypeDescription } from "ui";
import { setTestid } from "utils";

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
      <label {...setTestid("InputLabel")} className="flex gap-1 items-center">
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
      <span {...setTestid("PriceIndicator")} className="font-bold">
        {cost > 0 ? (
          <PriceDisplay price={cost} />
        ) : duration > 0 ? (
          <p>{t("FREE")}</p>
        ) : null}
      </span>
    </div>
  );
};
