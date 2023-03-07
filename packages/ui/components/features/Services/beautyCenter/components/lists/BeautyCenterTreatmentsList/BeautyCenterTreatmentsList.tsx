import React from "react";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";
import {
  Button,
  BeautyCenterTreatmentCard,
  ServiceCancelationPolicyInput,
  BeautyCenterTreatment,
  ServiceCancelationPolicy,
} from "@UI";
import { randomNum } from "utils";

export interface BeautyCenterTreatmentsListProps {
  treatments: BeautyCenterTreatment[];
  cancelation: ServiceCancelationPolicy[];
}

export const BeautyCenterTreatmentsList: React.FC<
  BeautyCenterTreatmentsListProps
> = ({ treatments, cancelation }) => {
  const treatmentsRef = usePublishRef((keys) => keys.treatments);
  const { t } = useTranslation();
  return (
    <div ref={treatmentsRef} className="flex flex-col gap-8">
      <p className="font-bold text-lg md:text-xl">{t("Treatments")}</p>
      <div className="flex flex-col gap-8 pr-2 ">
        {treatments.map((treatment, i) => (
          <BeautyCenterTreatmentCard
            treatment={treatment}
            selected={randomNum(10) > 7}
            onUnSelect={() => {}}
            onSelect={() => {}}
            key={i}
          />
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-bold">{t("Cancelation policy")}</p>
        {cancelation.map((policy, i) => (
          <ServiceCancelationPolicyInput
            {...policy}
            name="cancelationPolicy"
            onSelected={() => {}}
            key={`${i}-${policy.cost}`}
          />
        ))}
      </div>

      <Button className="self-end mr-4">{t("Book now")}</Button>
    </div>
  );
};
