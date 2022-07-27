import { HealthCenterDoctorMetaDataType } from "api";
import { Avatar, Button, HStack, Radio } from "ui";
import React from "react";
import { usePublishRef } from "state";
import { useTranslation } from "react-i18next";

export interface HealthCenterDoctorsListProps {
  doctors: HealthCenterDoctorMetaDataType[];
}

export const HealthCenterDoctorsList: React.FC<
  HealthCenterDoctorsListProps
> = ({ doctors }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4 py-4 px-2">
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
        <Button className="sm:hidden w-fit self-end">{t("Book now")}</Button>
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
}) => {
  const ref = usePublishRef("doctors");
  return (
    <div ref={ref} className="flex gap-2">
      <Avatar src={photo} alt={name} />
      <div className="flex flex-col justify-between">
        <p className="font-semibold">{name}</p>
        <p>{specialty}</p>
      </div>
    </div>
  );
};
