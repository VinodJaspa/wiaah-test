import { HealthCenterDoctorMetaDataType } from "api";
import { Avatar, PriceDisplay } from "ui";
import React from "react";
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
      <PriceDisplay price={price} />
    </div>
  );
};
