import React from "react";
import { useTranslation } from "react-i18next";
import { Radio, PriceDisplay, ServiceRefundableTypeDescription } from "@UI";
import { setTestid } from "utils";

export interface ServiceCancelationPolicyInputProps {
  id: string;
  name: string;
  onSelected: (id: string) => any;
  cost: number;
  duration: number;
  children?: React.ReactNode;
}

export const ServiceCancelationPolicyInput: React.FC<
  ServiceCancelationPolicyInputProps
> = ({ cost, duration, id, children, name, onSelected }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center w-full gap-2 justify-between">
      <label
        {...setTestid("InputLabel")}
        className="flex gap-2 text-lightBlack items-center"
      >
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
      <span {...setTestid("PriceIndicator")} className="text-primary font-bold">
        {cost > 0 ? (
          <PriceDisplay price={cost} />
        ) : duration > 0 ? (
          <p>{t("FREE")}</p>
        ) : null}
      </span>
    </div>
  );
};
