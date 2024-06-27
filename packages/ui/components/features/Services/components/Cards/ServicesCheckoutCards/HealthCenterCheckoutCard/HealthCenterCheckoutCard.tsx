import { HealthCenterCheckoutBookedPropertyData } from "api";
import React from "react";
import { ServiceCheckoutCommonCardWrapper, HealthCenterDoctorCard } from "@UI";

export interface HealthCenterCheckoutCardProps
  extends HealthCenterCheckoutBookedPropertyData {}

export const HealthCenterCheckoutCard: React.FC<
  HealthCenterCheckoutCardProps
> = ({ children, ...props }) => {
  const { doctor } = props;
  return (
    <ServiceCheckoutCommonCardWrapper {...props}>
      <HealthCenterDoctorCard
        doctor={{
          speciality: {
            name: doctor.specialty,
            description: "",
            id: doctor.id,
          },
          id: doctor.id,
          name: doctor.name,
          price: doctor.price,
          thumbnail: doctor.photo,
          specialityId: doctor.id,
          rating: doctor.rating!,
          healthCenterId: doctor.healthCenterId!,
          description: doctor.description!,
          availablityStatus: doctor.availabilityStatus!,
        }}
      />
    </ServiceCheckoutCommonCardWrapper>
  );
};
