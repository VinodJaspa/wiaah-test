import React from "react";
import { useTranslation } from "react-i18next";
import { Radio, PriceDisplay } from "@UI";
import { ServiceRefundableTypeDescription } from "@UI/components/features/Services/components/DataDisplay/ServiceRefundableTypeDescription";
import { cn, setTestid } from "utils";

export interface ServiceCancelationPolicyInputProps {
  id: string;
  name: string;
  onSelected: (id: string) => any;
  cost: number;
  duration: number;
  children?: React.ReactNode;
  isCalendarCard?: boolean;
}

export const ServiceCancelationPolicyInput: React.FC<
  ServiceCancelationPolicyInputProps
> = ({ cost, duration, id, children, name, onSelected, isCalendarCard }) => {
const { t } = useTranslation();

  return (
    <div
      className={cn(
        isCalendarCard
          ? "w-full flex items-center justify-between"
          : "w-full grid grid-cols-[auto_100px]",
      )}
    >
      <label
        {...setTestid("InputLabel")}
        className="flex text-lightBlack items-center gap-2"
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
