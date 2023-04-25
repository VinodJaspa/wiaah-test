import { HealthCenterSpecialty } from "@features/API";
import { Avatar, HealthCenterDoctor, PriceDisplay } from "@UI";
import React from "react";
export interface HealthCenterDoctorCardProps {
  doctor: {
    thumbnail: string;
    name: string;
    speciality: string;
    price: number;
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
          <p className="font-semibold text-lg">{doctor.name}</p>
          <p className="text-gray-400">{doctor.speciality.name}</p>
        </div>
      </div>
      <PriceDisplay price={doctor.price} />
    </div>
  );
};
