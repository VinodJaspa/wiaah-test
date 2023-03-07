import React from "react";
import { useTranslation } from "react-i18next";
import {
  PriceDisplay,
  UnDiscountedPriceDisplay,
  Button,
  TimeRangeDisplay,
  BeautyCenterTreatment,
} from "@UI";

export interface BeautyCenterTreatmentCardProps {
  onSelect: (treatmentId: string) => any;
  onUnSelect: (treatmentId: string) => any;
  selected?: boolean;
  treatment: BeautyCenterTreatment;
}

export const BeautyCenterTreatmentCard: React.FC<
  BeautyCenterTreatmentCardProps
> = ({ treatment, selected, onSelect, onUnSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full justify-between">
      <div className="md:text-lg font-semibold flex flex-col gap-1">
        <p className="">
          {treatment.category?.title} - {treatment.title}
        </p>
        <div className="flex font-normal text-base gap-2">
          <TimeRangeDisplay rangeInMinutes={treatment.duration} />
          <p onClick={() => {}} className="cursor-pointer text-primary">
            {t("Show Details")}
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex font-semibold flex-col gap-1 items-end">
          <PriceDisplay symbol priceObject={{ amount: treatment.price }} />
          <UnDiscountedPriceDisplay
            className="text-gray-400"
            amount={treatment?.price || 0 * treatment?.discount?.value || 1}
            discount={treatment?.discount?.value}
          />
        </div>
        <Button
          onClick={() => {
            if (selected) {
              onUnSelect && onUnSelect(treatment.id);
            } else {
              onSelect && onSelect(treatment.id);
            }
          }}
          className="h-fit w-24"
          outline={!selected}
        >
          {selected ? t("Selected") : t("Select")}
        </Button>
      </div>
    </div>
  );
};
