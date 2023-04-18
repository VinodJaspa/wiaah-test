import {
  Button,
  HStack,
  Radio,
  ServiceCancelationPolicyInput,
  HealthCenterDoctorCard,
  HealthCenterDoctor,
  ServiceCancelationPolicy,
  HealthCenterDoctorCardProps,
} from "@UI";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";

export interface HealthCenterDoctorsListProps {
  doctors: HealthCenterDoctorCardProps["doctor"][];
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
      </div>
    </div>
  );
};
