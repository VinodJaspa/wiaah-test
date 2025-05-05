import React from "react";
import { useTranslation } from "react-i18next";
import { PriceType } from "types";
import { Button, PriceDisplay } from "@UI";

export interface SubscriptionPlanCardProps {
  price: number;
  trialDays?: number;
  onUpgradeRequest?: () => any;
  benifits: string[];
}

export const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({
  benifits,
  onUpgradeRequest,
  price,
  trialDays,
}) => {
const { t } = useTranslation();
  return (
    <div className="relative text-white items-center flex flex-col gap-4 justify-between py-16 w-[min(100%,20rem)] min-h-[30rem] bg-gradient-to-tl from-blue-600 to-primary rounded-lg shadow-md shadow-blue-600">
      <p className="text-4xl flex gap-1">
        <PriceDisplay price={price} />
      </p>
      <div className="text-opacity-50 flex flex-col items-center gap-2">
        {benifits.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
      <span className="font-bold">
        {trialDays && (
          <>
            {trialDays} {t("day_free_trial", "Day Free Trial")}
          </>
        )}
      </span>
      <Button
        onClick={() => {
          onUpgradeRequest && onUpgradeRequest();
        }}
        className="absolute bottom-0 translate-y-1/2 rounded-full px-8 shadow "
      >
        {t("Upgrade")}
      </Button>
    </div>
  );
};
