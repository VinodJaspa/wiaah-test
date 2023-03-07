import {
  Button,
  HStack,
  Radio,
  ServiceCancelationPolicyInput,
  HealthCenterDoctorCard,
  HealthCenterDoctor,
  ServiceCancelationPolicy,
} from "@UI";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";

export interface HealthCenterDoctorsListProps {
  doctors: HealthCenterDoctor[];
  cancelation: ServiceCancelationPolicy[];
}

export const HealthCenterDoctorsList: React.FC<
  HealthCenterDoctorsListProps
> = ({ doctors, cancelation }) => {
  const { t } = useTranslation();
  const ref = usePublishRef((keys) => keys.doctors);
  return (
    <div ref={ref} className="flex flex-col gap-4 py-4 px-2">
      <p className="text-lg font-bold">{t("Doctors")}</p>
      <div className="flex flex-col gap-4">
        {Array.isArray(doctors)
          ? doctors.map((doctor, i) => (
              <label>
                <HStack className="justify-between" key={i}>
                  <HealthCenterDoctorCard doctor={doctor} />
                  <Radio name="doctor" />
                </HStack>
              </label>
            ))
          : null}

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
        <Button className="w-fit self-end">{t("Book now")}</Button>
      </div>
    </div>
  );
};
