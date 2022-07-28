import { BeautyCenterTreatmentDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { SeperatedStringArray } from "utils";
import { PriceDisplay, UnDiscountedPriceDisplay, Button } from "ui";

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
  function formatMinutes(minutes: number): string {
    if (minutes > 59) {
      const hrs = Math.floor(minutes / 60);
      const reminingMins = minutes % 60;
      const reminingPercent = (reminingMins / 60) * 100;
      return `${hrs}${
        reminingPercent > 10 ? `.${reminingPercent.toPrecision(1)}` : ""
      } hrs`;
    }
    return `${minutes} mins`;
  }

  return (
    <div className="flex w-full justify-between">
      <div className="md:text-lg font-semibold flex flex-col gap-1">
        <p className="">
          {category} - {title}
        </p>
        <div className="flex font-normal text-base gap-2">
          <p>
            {SeperatedStringArray(
              durationInMinutes.map((dur, i) => formatMinutes(dur)),
              "-"
            )}
          </p>
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
