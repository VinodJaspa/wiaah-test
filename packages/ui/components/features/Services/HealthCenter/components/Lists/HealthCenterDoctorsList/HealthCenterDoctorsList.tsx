import {
  HealthCenterDoctorMetaDataType,
  ServiceCancelationPolicyType,
} from "api";
import {
  Avatar,
  Button,
  HStack,
  Radio,
  PriceDisplay,
  ServiceCancelationPolicyInput,
} from "ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePublishRef } from "state";

export interface HealthCenterDoctorsListProps {
  doctors: HealthCenterDoctorMetaDataType[];
  cancelation: ServiceCancelationPolicyType[];
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
                  <HealthCenterDoctorCard {...doctor} />
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
              key={`${i}-${policy.id}`}
            />
          ))}
        </div>
        <Button className="w-fit self-end">{t("Book now")}</Button>
      </div>
    </div>
  );
};

export interface HealthCenterDoctorCardProps
  extends HealthCenterDoctorMetaDataType {}

export const HealthCenterDoctorCard: React.FC<HealthCenterDoctorCardProps> = ({
  id,
  name,
  photo,
  specialty,
  price,
}) => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-2">
        <Avatar src={photo} alt={name} />
        <div className="flex flex-col ">
          <p className="font-semibold">{name}</p>
          <p>{specialty}</p>
        </div>
      </div>
      <PriceDisplay priceObject={{ amount: price }} />
    </div>
  );
};
