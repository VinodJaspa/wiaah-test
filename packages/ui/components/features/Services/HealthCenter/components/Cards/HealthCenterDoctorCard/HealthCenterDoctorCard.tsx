import { HealthCenterSpecialty } from "@features/API";
import { Avatar, HealthCenterDoctor, PriceDisplay } from "@UI";
import React from "react";
export interface HealthCenterDoctorCardProps {
  doctor: Pick<HealthCenterDoctor, "name" | "thumbnail" | "price"> & {
    speciality: Pick<HealthCenterSpecialty, "name">;
  };
}

export const HealthCenterDoctorCard: React.FC<HealthCenterDoctorCardProps> = ({
  doctor,
}) => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-2">
        <Avatar src={doctor.thumbnail} alt={doctor.name} />
        <div className="flex flex-col ">
          <p className="font-semibold">{doctor.name}</p>
          <p>{doctor.speciality?.name}</p>
        </div>
      </div>
      <PriceDisplay price={doctor.price} />
    </div>
  );
};
