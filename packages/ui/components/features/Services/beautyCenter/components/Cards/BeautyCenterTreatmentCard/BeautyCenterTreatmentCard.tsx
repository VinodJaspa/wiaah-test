import { BeautyCenterTreatmentDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  PriceDisplay,
  UnDiscountedPriceDisplay,
  Button,
  TimeRangeDisplay,
} from "ui";

export interface BeautyCenterTreatmentCardProps
  extends BeautyCenterTreatmentDataType {
  onSelect: (treatmentId: string) => any;
  selected?: boolean;
}

export const BeautyCenterTreatmentCard: React.FC<
  BeautyCenterTreatmentCardProps
> = ({
  category,
  discount,
  durationInMinutes,
  price,
  title,
  selected,
  onSelect,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full justify-between">
      <div className="md:text-lg font-semibold flex flex-col gap-1">
        <p className="">
          {category} - {title}
        </p>
        <div className="flex font-normal text-base gap-2">
          <TimeRangeDisplay rangeInMinutes={durationInMinutes} />
          <p onClick={() => {}} className="cursor-pointer text-primary">
            {t("Show Details")}
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex font-semibold flex-col gap-1 items-end">
          <PriceDisplay symbol priceObject={{ amount: price }} />
          <UnDiscountedPriceDisplay
            className="text-gray-400"
            amount={price}
            discount={discount}
          />
        </div>
        <Button className="h-fit w-24" outline={!selected}>
          {selected ? t("Selected") : t("Select")}
        </Button>
      </div>
    </div>
  );
};
