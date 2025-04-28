import { ServiceCancelationPolicy } from "@features/API";
import { ServiceCancelationPolicyInput } from "@UI/components/features/Services/components/Inputs/ServiceCancelationPolicyInput";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";
import {
  HealthCenterDoctorCard,
  HealthCenterDoctorCardProps,
} from "../../Cards";

export interface HealthCenterDoctorsListProps {
  doctors: HealthCenterDoctorCardProps["doctor"][];
  cancelation: ServiceCancelationPolicy[];
}

export const HealthCenterDoctorsList: React.FC<
  HealthCenterDoctorsListProps
> = ({ doctors, cancelation }) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const ref = usePublishRef((keys) => keys.doctors);
  return (
    <div ref={ref} className="w-full flex flex-col gap-y-4 py-4">
      <p className="text-lg font-bold">{t("Doctors")}</p>
      <div className="flex flex-col gap-y-4 w-full">
        {Array.isArray(doctors)
          ? doctors.map((doctor, i) => (
              <HealthCenterDoctorCard key={i} doctor={doctor} />
            ))
          : null}
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-bold">{t("Cancelation policy")}</p>
        {cancelation.map((policy, i) => (
          <ServiceCancelationPolicyInput
            {...policy}
            name="cancelationPolicy"
            onSelected={() => {}}
            key={`${i}-${policy}`}
          />
        ))}
      </div>
    </div>
  );
};
