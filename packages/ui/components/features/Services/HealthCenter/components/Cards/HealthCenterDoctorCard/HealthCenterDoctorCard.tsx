import { Doctor, HealthCenterSpecialty, Maybe } from "@features/API";
import { Avatar, PriceDisplay, Radio } from "@UI";
import React from "react";
export interface HealthCenterDoctorCardProps {
  doctor: { __typename?: "Doctor" } & Pick<
    Doctor,
    | "availablityStatus"
    | "description"
    | "healthCenterId"
    | "id"
    | "name"
    | "price"
    | "rating"
    | "specialityId"
    | "thumbnail"
  > & {
      speciality?: Maybe<
        { __typename?: "HealthCenterSpecialty" } & Pick<
          HealthCenterSpecialty,
          "description" | "id" | "name"
        >
      >;
    };
}

export const HealthCenterDoctorCard: React.FC<HealthCenterDoctorCardProps> = ({
  doctor,
}) => {
  return (
    <div className="w-full grid grid-cols-[auto_100px] items-center">
      <div className="flex gap-2">
        <Avatar src={doctor.thumbnail} alt={doctor.name} />
        <div className="flex flex-col ">
          <p className="font-semibold text-lg">{doctor.name}</p>
          <p className="text-gray-400">
            {doctor?.speciality?.name || "unknown"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <PriceDisplay price={doctor.price} />
        <Radio name="doctor" />
      </div>
    </div>
  );
};
