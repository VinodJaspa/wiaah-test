import React from "react";
import { useTranslation } from "react-i18next";
import {
  PriceDisplay,
  UnDiscountedPriceDisplay,
  Button,
  TimeRangeDisplay,
  Image,
} from "@UI";
import { useRouting } from "routing";
import { Treatment } from "@features/API";

export interface BeautyCenterTreatmentCardProps {
  onSelect: (treatmentId: string) => any;
  onUnSelect: (treatmentId: string) => any;
  selected?: boolean;
  treatment: Treatment;
}

export const BeautyCenterTreatmentCard: React.FC<
  BeautyCenterTreatmentCardProps
> = ({ treatment, selected, onSelect, onUnSelect }) => {
  const { t } = useTranslation();
  const { visit } = useRouting();

  return (
    <div className="w-full grid grid-cols-[auto_100px]">
      <div className="flex gap-2 items-center">
        <Image className="w-32 h-24" src={treatment.thumbnail}></Image>
        <div className="md:text-lg font-semibold flex flex-col gap-1">
          <p className="">
            {treatment.category?.title} - {treatment.title}
          </p>
          <div className="flex font-normal text-base gap-2">
            <TimeRangeDisplay rangeInMinutes={treatment.duration} />
            <p
              onClick={() => {
                visit((r) =>
                  r.visitServiceDetails(treatment.beautyCenterServiceId),
                );
              }}
              className="cursor-pointer text-primary"
            >
              {t("Show Details")}
            </p>
          </div>
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
