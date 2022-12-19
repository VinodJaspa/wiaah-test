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
      <HealthCenterDoctorCard {...doctor} />
    </ServiceCheckoutCommonCardWrapper>
  );
};
