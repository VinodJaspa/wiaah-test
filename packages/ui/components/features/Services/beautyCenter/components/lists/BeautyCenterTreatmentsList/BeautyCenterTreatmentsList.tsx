import { BeautyCenterTreatmentDataType } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";
import { Button, BeautyCenterTreatmentCard } from "ui";
import { randomNum } from "utils";

export interface BeautyCenterTreatmentsListProps {
  treatments: BeautyCenterTreatmentDataType[];
}

export const BeautyCenterTreatmentsList: React.FC<
  BeautyCenterTreatmentsListProps
> = ({ treatments }) => {
  const treatmentsRef = usePublishRef("treatments");
  const { t } = useTranslation();
  return (
    <div ref={treatmentsRef} className="flex flex-col gap-8">
      <p className="font-bold text-lg md:text-xl">{t("Treatments")}</p>
      <div className="flex flex-col gap-8 max-h-[40rem] thinScroll pr-2 overflow-y-scroll">
        {treatments.map((treatment, i) => (
          <BeautyCenterTreatmentCard
            selected={randomNum(10) > 7}
            onSelect={() => {}}
            {...treatment}
            key={i}
          />
        ))}
      </div>
      <Button className="self-end mr-4">{t("Book now")}</Button>
    </div>
  );
};
