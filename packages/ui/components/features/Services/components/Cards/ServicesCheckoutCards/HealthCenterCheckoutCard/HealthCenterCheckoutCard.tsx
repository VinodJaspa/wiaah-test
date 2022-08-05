import { HealthCenterCheckoutBookedPropertyData } from "api";
import React from "react";
import { useTranslation } from "react-i18next";
import { ServiceCheckoutCommonCardWrapper, HealthCenterDoctorCard } from "ui";

export interface HealthCenterCheckoutCardProps
  extends HealthCenterCheckoutBookedPropertyData {}

export const HealthCenterCheckoutCard: React.FC<
  HealthCenterCheckoutCardProps
> = ({ children, ...props }) => {
  const { doctor, guests } = props;
  const { t } = useTranslation();
  return (
    <ServiceCheckoutCommonCardWrapper {...props}>
      <div className="flex items-center gap-2">
        <p className="font-semibold">{t("Guests")}:</p>
        <p>{guests}</p>
      </div>
      <HealthCenterDoctorCard {...doctor} />
    </ServiceCheckoutCommonCardWrapper>
  );
};
